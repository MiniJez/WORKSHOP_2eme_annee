################ Imports ####################

import requests
import sched, time, datetime
from pm25 import pm25_execution_process
from temperature import temperature_execution_process
from co2 import co2_execution_process
from humidity import humidity_execution_process
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

    for sensor in sensorsData:
        print("Sensor ID : " + sensor["sensorID"][0])

        # Récupération des executions des capteurs => /getSensors/:id => 062336c2-d39b-42cf-a8bb-1d05de74bd7e
        print("https://eclisson.duckdns.org/ConnectedCity/getSensors/"+sensor["sensorID"][0])
        rawDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors/"+sensor["sensorID"][0])
        print("Statuts : "+str(rawDataResponse.status_code))
        if rawDataResponse.status_code == 200:
            rawData = json.loads(rawDataResponse.text)
            print("Nombre de RawData pour le capteur : "+ str(len(rawData)))
            rawList = sorted(rawData, key=lambda item: item['time'], reverse=True)

            # Récupération de la dernière exécution du capteur
            lastExecution = rawList[0]
            s, ms = divmod(int(lastExecution["time"]), 1000)
            print("Last execution : ", '%s.%03d' % (time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(s)), ms))

            # Vérification
            pm25_execution_process(lastExecution["PM25"])
            temperature_execution_process(lastExecution["temp"])
            co2_execution_process(lastExecution["C02"])
            humidity_execution_process(lastExecution["humidity"])
            break
    
    #s.enter(60, 1, ia_process, (sc,))

#s.enter(60, 1, ia_process, (s,))
#s.run()

ia_process()
