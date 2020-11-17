from alerts import Alerts
import requests
import json



def temperature_median():
    # print("https://eclisson.duckdns.org/ConnectedCity/getUsers")
    filter = {
        "sort": -1,
        "limit": 10
    }
    rawDataResponse = requests.post("https://eclisson.duckdns.org/ConnectedCity/getRawdata", json=filter)
    rawData = json.loads(rawDataResponse.text)
    # print("Nombre de users : " + str(len(usersData)))

    temp = 0
    for raw in rawData:
        # print("User ID : " + users["userID"])
        temp = temp + float(raw["temp"])
        break

    print(temp / len(rawData))
    return temp / len(rawData)

def temperature_execution_process(value):
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
