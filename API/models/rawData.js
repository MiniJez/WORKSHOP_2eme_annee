const mongoose = require('mongoose');

const RawDataSchema = mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId, // id unique
    sensorID : String, // id of the sensor
    time : mongoose.Schema.Types.String, // valeur soit en ISO soit en secondes depuis l'an 1900
    temp : String, // float entre -100 et + 100 (en C°)
    humidity : String, // float entre 0 et 100 (en %)
    C02 : String, // entier entre 0 et 5000
    PM25 : String// float entre 0 et 500 
})

const RawData = mongoose.model('RawData', RawDataSchema, 'RawData');

module.exports.RawData = RawData;
