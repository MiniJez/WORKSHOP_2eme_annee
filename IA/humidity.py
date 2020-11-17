from alerts import Alerts

def humidity_execution_process(value):
    print("Vérification Humidité : " + str(value))
    if float(value) >= 60:
        print("Attention : "+Alerts.Humidite_Alerte_1.value)
        return Alerts.Humidite_Alerte_1.value
    elif float(value) <= 40:
        print("Attention : "+Alerts.Humidite_Alerte_2.value)
        return Alerts.Humidite_Alerte_2.value

    print("***")