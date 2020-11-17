from enum import Enum

class Alerts(Enum):
    CO2_Alerte_1 = "Concentrations typiques des espaces intérieurs occupés avec un bon échange d'air"
    CO2_Alerte_2 = "Aération nécessaire : attention à la somnolence et au manque d'air."
    CO2_Alerte_3 = "Aération nécessaire : attention aux maux de tête, à la somnolence, entraîne une mauvaise concentration, une perte d'attention, une augmentation de la fréquence cardiaque et de légères nausées"
    CO2_Alerte_4 = "Aération vraiment nécessaire, le taux est au dessus de la limite!"
    CO2_Alerte_5 = "Sortez immédiatement du lieu où vous vous trouvez ! Cela peut entraîner de grave privation d'oxygène entraînant des lésions cérébrales permanentes, le coma, voire la mort"
    Humidite_Alerte_1 = "Il fait trop humide chez vous, achetez un déshumidificateur"
    PM_Alerte_1 = "Pour les personnes sensibles, envisagez de réduire les efforts prolongés ou intenses"
    PM_Alerte_2 = "Les personnes souffrant de maladies respiratoires ou cardiaques, les personnes âgées et les enfants doivent limiter les efforts prolongés."
    Temperature_Alerte_1 = "Il fait trop chaud : éteignez/baissez votre chauffage ou ouvrez les fenêtres"