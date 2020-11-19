from alerts import Alerts
import requests
import json
import token_env

def temperature_median():
    filter = {
        "sort": -1,
        "limit": 1000
    }
    rawDataResponse = requests.post("https://eclisson.duckdns.org/ConnectedCity/getRawdata", headers=token_env.HEADERS, json=filter)
    rawData = json.loads(rawDataResponse.text)

    temp = 0
    for raw in rawData:
        temp = temp + float(raw["temp"])
        break

    print(temp / len(rawData))
    return temp / len(rawData)

def temperature_execution_process(value):
    
    try:
        value = float(value)
    except ValueError:
        return ''

    if isinstance(value, float):
        print("***")
        print("Vérification Température : " + str(value))
        median = temperature_median()

        if float(value) > median+2:
            print(Alerts.Temperature_Alerte_1)
            return Alerts.Temperature_Alerte_1
        elif float(value) < median-2:
            print(Alerts.Temperature_Alerte_2)
            return Alerts.Temperature_Alerte_2

    return ''
