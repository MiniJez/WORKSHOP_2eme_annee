from alerts import Alerts

def co2_execution_process(value):
    
    try:
        value = int(value)
    except ValueError:
        return ''

    if isinstance(value, int):
        print("***")
        print("Vérification CO2 : " + str(value))
        if 1000 <= int(value) <= 2000:
            print(Alerts.CO2_Alerte_1)
            return Alerts.CO2_Alerte_1
        elif 2000 <= int(value) <= 5000:
            print(Alerts.CO2_Alerte_2)
            return Alerts.CO2_Alerte_2
        elif int(value) <= 5000:
            print(Alerts.CO2_Alerte_3)
            return Alerts.CO2_Alerte_3
        elif int(value) <= 40000:
            print(Alerts.CO2_Alerte_4)
            return Alerts.CO2_Alerte_4
        
    return ''