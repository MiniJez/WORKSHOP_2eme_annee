const mongoose = require('mongoose');


const AlertSchema = new mongoose.Schema({
    CO2: String,
    Humidite: String,
    Temperature: String,
    PM25: String,
    SensorID: String
})

const Alert = mongoose.model('Alerts', AlertSchema, 'Alerts');

module.exports.Alert = Alert;