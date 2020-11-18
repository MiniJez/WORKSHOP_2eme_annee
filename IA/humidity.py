from alerts import Alerts

def humidity_execution_process(value):

    try:
        value = float(value)
    except ValueError:
        return ''
        
    if isinstance(value, float):
        print("***")
        print("Vérification Humidité : " + str(value))
        if float(value) >= 60:
            print("Attention : "+Alerts.Humidite_Alerte_1)
            return Alerts.Humidite_Alerte_1
        elif float(value) <= 40:
            print("Attention : "+Alerts.Humidite_Alerte_2)
            return Alerts.Humidite_Alerte_2

    return ''
