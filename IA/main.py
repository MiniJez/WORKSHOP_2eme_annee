################ Imports ####################

import requests
import sched, time, datetime
from pm25 import pm25_execution_process
from temperature import temperature_execution_process
from co2 import co2_execution_process
from humidity import humidity_execution_process
from alerts import Alerts
import json
import env_var
from datetime import datetime

################ Program ####################

print("Hello World ! I'm the IA !")

#Vérification toutes les minutes
s = sched.scheduler(time.time, time.sleep)

def ia_process():
    # Génération du token    
    env_var.Generation_Token()
    env_var.Generation_Temperature_Moyenne()
    
    # Récupération des capteurs => /getSensors
    sensorsDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors", headers=env_var.HEADERS)
    sensorsData = json.loads(sensorsDataResponse.text)
    maxCount = 50
    count = 0
    # Pour chaque capteur dans la base de données
    for sensor in sensorsData:
        print(count)
        if count == maxCount:
            break
        print("Sensor ID : " + sensor["sensorID"][0])

        # Récupération des executions des capteurs => /getSensors/:id => 062336c2-d39b-42cf-a8bb-1d05de74bd7e
        rawDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getRawData/"+sensor["sensorID"][0], headers=env_var.HEADERS)
        # Vérifie qu'il y a des executions pour ce capteur
        if rawDataResponse.text != "[]":
            rawData = json.loads(rawDataResponse.text)
            rawList = sorted(rawData, key=lambda item: item['time'], reverse=True)

            # Récupération de la dernière exécution du capteur
            lastExecution = rawList[0]
            # s, ms = divmod(int(lastExecution["time"]), 1000)

            # Vérification des différentes alertes
            pm25Alert = pm25_execution_process(lastExecution["PM25"])
            temperatureAlert = temperature_execution_process(lastExecution["temp"])
            co2Alert = co2_execution_process(lastExecution["C02"])
            humidityAlert = humidity_execution_process(lastExecution["humidity"])

            # Récupération des anciennes alertes pour le capteur en question
            AlertClass = Alerts()
            alertDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getAlerts/"+sensor["sensorID"][0], headers=env_var.HEADERS)
            if alertDataResponse.text != "[]":
                # S'il y a déjà des alertes en base pour ce capteur, alors on compare les anciennes alertes avec les nouvelles
                print("Update des alertes en base de données")
                alertData = json.loads(alertDataResponse.text)
                AlertClass.updateAlerts(sensor, alertData[0], co2Alert, pm25Alert, humidityAlert, temperatureAlert)

            elif alertDataResponse.text == "[]":
                print("Insertion des alertes en base de données")
                # S'il n'y a aucune alerte référencée en base de données pour ce capteur, alors on insère en BDD les alertes détectées
                AlertClass.insertAlerts(sensor, co2Alert, pm25Alert, humidityAlert, temperatureAlert)
        count = count + 1
    # s.enter(600, 1, ia_process, ())

# s.enter(600, 1, ia_process, (s,))
# s.run()

ia_process()