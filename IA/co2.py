from alerts import Alerts

def co2_execution_process(value):
    print("Vérification CO2 : " + str(value))

    if 1000 <= float(value) <= 2000:
        print(Alerts.CO2_Alerte_1)
        return Alerts.CO2_Alerte_1
    elif 2000 <= float(value) <= 5000:
        print(Alerts.CO2_Alerte_2)
        return Alerts.CO2_Alerte_2
    elif float(value) <= 5000:
        print(Alerts.CO2_Alerte_3)
        return Alerts.CO2_Alerte_3
    elif float(value) <= 40000:
        print(Alerts.CO2_Alerte_4)
        return Alerts.CO2_Alerte_4
        
    print("***")
    return ''