from alerts import Alerts

def pm25_execution_process(value):

    try:
        value = int(value)
    except ValueError:
        return ''
        
    if isinstance(value, int):
        print("***")
        print("Vérification PM 2.5 : " + str(value))
        if 12.1 <= float(value) <= 35.4:
            print("Attention : "+Alerts.PM_Alerte_1)
            return Alerts.PM_Alerte_1
        elif 35.5 <= float(value) <= 55.4:
            print("Attention : "+Alerts.PM_Alerte_2)
            return Alerts.PM_Alerte_2
        elif 55.5 <= float(value) <= 150.4:
            print("Attention : "+Alerts.PM_Alerte_3)
            return Alerts.PM_Alerte_3
        elif 150.5 <= float(value) <= 250.4:
            print("Attention : "+Alerts.PM_Alerte_4)
            return Alerts.PM_Alerte_4
        elif 250.5 <= float(value) <= 500.4:
            print("Attention : "+Alerts.PM_Alerte_5)
            return Alerts.PM_Alerte_5

    return ''
