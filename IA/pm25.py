from alerts import Alerts

def pm25_execution_process(value):
    print("Vérification PM 2.5 : " + str(value))

    if 12.1 <= float(value) <= 35.4:
        print("Attention : "+Alerts.PM_Alerte_1.value)
        return Alerts.PM_Alerte_1.value
    elif 35.5 <= float(value) <= 55.4:
        print("Attention : "+Alerts.PM_Alerte_2.value)
        return Alerts.PM_Alerte_2.value
    elif 55.5 <= float(value) <= 150.4:
        print("Attention : "+Alerts.PM_Alerte_3.value)
        return Alerts.PM_Alerte_3.value
    elif 150.5 <= float(value) <= 250.4:
        print("Attention : "+Alerts.PM_Alerte_4.value)
        return Alerts.PM_Alerte_4.value
    elif 250.5 <= float(value) <= 500.4:
        print("Attention : "+Alerts.PM_Alerte_5.value)
        return Alerts.PM_Alerte_5.value
    
    print("***")