################ Imports ####################

import requests
import sched, time, datetime
from pm25 import pm25_execution_process
from temperature import temperature_execution_process
from co2 import co2_execution_process
from humidity import humidity_execution_process
from alerts import Alerts
import json

################ Program ####################

print("Hello World ! I'm the IA !")

#Vérification toutes les minutes
s = sched.scheduler(time.time, time.sleep)

def ia_process():

    # Récupération des capteurs => /getSensors
    print("https://eclisson.duckdns.org/ConnectedCity/getSensors")
    sensorsDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors")
    sensorsData = json.loads(sensorsDataResponse.text)
    print("Nombre de capteurs : "+ str(len(sensorsData)))

    # Pour chaque capteur dans la base de données
    for sensor in sensorsData:
        print("Sensor ID : " + sensor["sensorID"][0])

        # Récupération des executions des capteurs => /getSensors/:id => 062336c2-d39b-42cf-a8bb-1d05de74bd7e
        print("https://eclisson.duckdns.org/ConnectedCity/getRawData/"+sensor["sensorID"][0])
        rawDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getRawData/"+sensor["sensorID"][0])
        print("Statuts : "+str(rawDataResponse.status_code))
        # Vérifie qu'il y a des executions pour ce capteur
        if rawDataResponse.text != "[]":
            rawData = json.loads(rawDataResponse.text)
            print("Nombre de RawData pour le capteur : "+ str(len(rawData)))
            rawList = sorted(rawData, key=lambda item: item['time'], reverse=True)

            # Récupération de la dernière exécution du capteur
            lastExecution = rawList[0]
            s, ms = divmod(int(lastExecution["time"]), 1000)
            print("Last execution : ", '%s.%03d' % (time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(s)), ms))

            # Vérification des différentes alertes
            pm25Alert = pm25_execution_process(lastExecution["PM25"])
            temperatureAlert = temperature_execution_process(lastExecution["temp"])
            co2Alert = co2_execution_process(lastExecution["C02"])
            humidityAlert = humidity_execution_process(lastExecution["humidity"])

            # Récupération des anciennes alertes pour le capteur en question
            alertDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getAlerts/"+sensor["sensorID"][0])
            print("Statuts : "+str(alertDataResponse.status_code))
            if alertDataResponse.text != "[]":
                # S'il y a déjà des alertes en base pour ce capteur, alors on compare les anciennes alertes avec les nouvelles
                print("Update des alertes en base de données")
                alertData = json.loads(alertDataResponse.text)
                Alertsd.updateAlerts(sensor, alertData, co2Alert, pm25Alert, humidityAlert, temperatureAlert)

            elif alertDataResponse.text == "[]":
                print("Insertion des alertes en base de données")
                # S'il n'y a aucune alerte référencée en base de données pour ce capteur, alors on insère en BDD les alertes détectées
                Alerts.insertAlerts(sensor, co2Alert, pm25Alert, humidityAlert, temperatureAlert)

            break
    
    #s.enter(60, 1, ia_process, (sc,))

#s.enter(60, 1, ia_process, (s,))
#s.run()

ia_process()