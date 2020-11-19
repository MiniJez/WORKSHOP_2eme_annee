import requests
import json
import token_env


class Alerts():
    def __init__(self):
      self.attribut = 'value'

    CO2_Alerte_1 = "CO2_Alerte_1"
    CO2_Alerte_2 = "CO2_Alerte_2"
    CO2_Alerte_3 = "CO2_Alerte_3"
    CO2_Alerte_4 = "CO2_Alerte_4"
    
    Humidite_Alerte_1 = "Humidite_Alerte_1"
    Humidite_Alerte_2 = "Humidite_Alerte_2"

    PM_Alerte_1 = "PM_Alerte_1"
    PM_Alerte_2 = "PM_Alerte_2"
    PM_Alerte_3 = "PM_Alerte_3"
    PM_Alerte_4 = "PM_Alerte_4"
    PM_Alerte_5 = "PM_Alerte_5"

    Temperature_Alerte_1 = "Temperature_Alerte_1"
    Temperature_Alerte_2 = "Temperature_Alerte_2"

    ###
    #  Function qui va permettre d'ajouter en base de données une ligne d'alerte pour un sensor donné
    ###
    def insertAlerts(self, sensor, co2Alert, pm25Alert, humidityAlert, temperatureAlert):
        if co2Alert != "":
            print("Send notification for CO2")
        elif pm25Alert != "":
            print("Send notification for PM 2.5")
        elif humidityAlert != "":
            print("Send notification for Humidity")
        elif temperatureAlert != "":
            print("Send notification for Temperature")
        
        dataToInsert = {
            "alert": [
                {
                    "alertType":"CO2",
                    "text": co2Alert,
                    "checked": False
                },
                {
                    "alertType":"PM25",
                    "text": pm25Alert,
                    "checked": False
                },
                {
                    "alertType":"Humidite",
                    "text": humidityAlert,
                    "checked": False
                },
                {
                    "alertType":"Temperature",
                    "text": temperatureAlert,
                    "checked": False
                }
            ],
            "SensorID": sensor["sensorID"][0]
        }
        
        print("Data to insert : "+json.dumps(dataToInsert))
        requests.post("https://eclisson.duckdns.org/ConnectedCity/insertAlerts", headers=token_env.HEADERS, json=dataToInsert)

    ###
    #  Function qui va permettre de modifier en base de données une ligne d'alerte pour un sensor donné
    ###
    def updateAlerts(self, sensor, alertData, co2Alert, pm25Alert, humidityAlert, temperatureAlert):
        hasToUpdate = False

        co2Checked = ""
        pm25Checked = ""
        humidityChecked = ""
        temperatureChecked = ""
        
        for element in alertData["alert"]:
            if element["alertType"] == "CO2":
                if element["text"] != co2Alert:
                    print("Send notification for CO2")
                    co2Checked = False
                    hasToUpdate = True
            elif element["alertType"] == "PM25":
                if element["text"] != pm25Alert:
                    print("Send notification for PM 2.5")
                    pm25Checked = False
                    hasToUpdate = True
            elif element["alertType"] == "Humidite":
                if element["text"] != humidityAlert:
                    print("Send notification for Humidity")
                    humidityChecked = False
                    hasToUpdate = True
            elif element["alertType"] == "Temperature":
                if element["text"] != temperatureAlert:
                    print("Send notification for Temperature")
                    temperatureChecked = False
                    hasToUpdate = True
    
        for element in alertData["alert"]:
            if element["alertType"] == "CO2":
                if co2Checked == "":
                    co2Checked = element["checked"]
            if element["alertType"] == "PM25":
                if pm25Checked == "":
                    pm25Checked = element["checked"]
            if element["alertType"] == "Humidite":
                if humidityChecked == "":
                    humidityChecked = element["checked"]
            if element["alertType"] == "Temperature":
                if temperatureChecked == "":
                    temperatureChecked = element["checked"]

        # Si les nouvelles alertes sont différentes des précédentes alors fait un update en base de données
        if hasToUpdate == True:
            dataToUpdate = {
                "alert": [
                    {
                        "alertType": "CO2",
                        "text": co2Alert,
                        "checked": co2Checked
                    },
                    {
                        "alertType": "PM25",
                        "text": pm25Alert,
                        "checked": pm25Checked
                    },
                    {
                        "alertType": "Humidite",
                        "text": humidityAlert,
                        "checked": humidityChecked
                    },
                    {
                        "alertType": "Temperature",
                        "text": temperatureAlert,
                        "checked": temperatureChecked
                    }
                ],
                "SensorID": sensor["sensorID"][0]
            }
            
            print("Data to update : "+str(dataToUpdate))
            requests.post("https://eclisson.duckdns.org/ConnectedCity/updateAlerts/" + sensor["sensorID"][0], headers=token_env.HEADERS, json=dataToUpdate)