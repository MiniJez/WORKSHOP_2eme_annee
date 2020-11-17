from enum import Enum

class Alerts(Enum):
    CO2_Alerte_1 = "Aération nécessaire : attention à la somnolence et au manque d'air."
    CO2_Alerte_2 = "Aération nécessaire : attention aux maux de tête, à la somnolence, entraîne une mauvaise concentration, une perte d'attention, une augmentation de la fréquence cardiaque et de légères nausées"
    CO2_Alerte_3 = "Aération vraiment nécessaire, le taux est au dessus de la limite!"
    CO2_Alerte_4 = "Sortez immédiatement du lieu où vous vous trouvez ! Cela peut entraîner de grave privation d'oxygène entraînant des lésions cérébrales permanentes, le coma, voire la mort"
    
    Humidite_Alerte_1 = "Il fait trop humide chez vous, achetez un déshumidificateur"
    Humidite_Alerte_2 = "Il fait trop sec chez vous, essayez d’acheter un humidificateur d’air"

    PM_Alerte_1 = "Pour les personnes sensibles, envisagez de réduire les efforts prolongés ou intenses"
    PM_Alerte_2 = "Les personnes souffrant de maladies respiratoires ou cardiaques, les personnes âgées et les enfants doivent limiter les efforts prolongés."
    PM_Alerte_3 = "Tout le monde devrait limiter les efforts prolongés"
    PM_Alerte_4 = "Les personnes souffrant de maladies respiratoires ou cardiaques, les personnes âgées et les enfants doivent éviter toute activité; tout le monde devrait éviter un effort prolongé"
    PM_Alerte_5 = "Tout le monde devrait éviter tout effort.Les personnes souffrant de maladies respiratoires ou cardiaques, les personnes âgées et les enfants encourent un grand risque"

    Temperature_Alerte_1 = "Il fait trop chaud : éteignez/baissez votre chauffage ou ouvrez les fenêtres"
    Temperature_Alerte_2 = "Il fait trop froid : isolez vos murs"