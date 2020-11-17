from enum import Enum

class Alerts(Enum):
    CO2_Alerte_1 = "Concentrations typiques des espaces intérieurs occupés avec un bon échange d'air"
    Humidite_Alerte_1 = "Il fait trop humide chez vous, achetez un déshumidificateur"
    PM_Alerte_1 = "Pour les personnes sensibles, envisagez de réduire les efforts prolongés ou intenses"
    PM_Alerte_2 = "Les personnes souffrant de maladies respiratoires ou cardiaques, les personnes âgées et les enfants doivent limiter les efforts prolongés."
    Temperature_Alerte_1 = "Il fait trop chaud : éteignez/baissez votre chauffage ou ouvrez les fenêtres"