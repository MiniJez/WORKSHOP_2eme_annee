from alerts import Alerts
import requests
import json
import env_var


def temperature_execution_process(value):
    
    try:
        value = float(value)
    except ValueError:
        return ''

    if isinstance(value, float):
        print("***")
        print("Vérification Température : " + str(value))

        if float(value) > env_var.TEMPERATURE_MOYENNE+2:
            print(Alerts.Temperature_Alerte_1)
            return Alerts.Temperature_Alerte_1
        elif float(value) < env_var.TEMPERATURE_MOYENNE-2:
            print(Alerts.Temperature_Alerte_2)
            return Alerts.Temperature_Alerte_2

    return ''
