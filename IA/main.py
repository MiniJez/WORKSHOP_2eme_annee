################ Imports ####################

import requests
import sched, time, datetime
from pm import execution_process
import json

################ Program ####################

print("Hello World ! I'm the IA !")

#Vérification toutes les minutes
s = sched.scheduler(time.time, time.sleep)

def ia_process():

    # Récupération des capteurs => /getSensors
    sensorsDataJson = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensors").text
    sensorsData = json.loads(sensorsDataJson)
    print("Nombre de capteurs : "+ str(len(sensorsData)))

    for sensor in sensorsData:
        print("Sensor ID : " + sensor["sensorID"][0])

        # Récupération des executions des capteurs => /getSensor/:id => 062336c2-d39b-42cf-a8bb-1d05de74bd7e
        print("https://eclisson.duckdns.org/ConnectedCity/getSensor/"+sensor["sensorID"][0])
        rawDataResponse = requests.get("https://eclisson.duckdns.org/ConnectedCity/getSensor/"+sensor["sensorID"][0])
        print(rawDataResponse.status_code)
        if rawDataResponse.status_code == 200:
            rawData = json.loads(rawDataResponse.text)
            print("Nombre de RawData pour le capteur : "+ str(len(rawData)))
            rawList = sorted(rawData, key=lambda item: item['time'], reverse=True)

            # Récupération de la dernière exécution du capteur
            lastExecution = rawList[0]
            s, ms = divmod(int(lastExecution["time"]), 1000)
            print("Last execution : ", '%s.%03d' % (time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(s)), ms))

            # # Vérification
            execution_process(lastExecution["PM25"])
            print("Vérification Température")
            print("Vérification Humidité")
            print("Vérification CO2")
            break
    
    #s.enter(60, 1, ia_process, (sc,))

#s.enter(60, 1, ia_process, (s,))
#s.run()

ia_process()
