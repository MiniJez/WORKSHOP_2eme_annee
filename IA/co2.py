from alerts import Alerts

def co2_execution_process(value):
    print("Vérification CO2 : " + str(value))
    print("***")

    if 1000 <= float(value) <= 2000:
        print(Alerts.CO2_Alerte_1.value)
        return Alerts.CO2_Alerte_1.value
    elif 2000 <= float(value) <= 5000:
        print(Alerts.CO2_Alerte_2.value)
        return Alerts.CO2_Alerte_2.value
    elif float(value) <= 5000:
        print(Alerts.CO2_Alerte_3.value)
        return Alerts.CO2_Alerte_3.value
    elif float(value) <= 40000:
        print(Alerts.CO2_Alerte_4.value)
        return Alerts.CO2_Alerte_4.value
