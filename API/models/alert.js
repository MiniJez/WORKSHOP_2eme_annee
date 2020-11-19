const mongoose = require('mongoose');


const AlertSchema = new mongoose.Schema({
    alert: [{
        alertType: String,
        text: String,
        checked: Boolean
    }],
    SensorID: String
})

const Alert = mongoose.model('Alerts', AlertSchema, 'Alerts');

module.exports.Alert = Alert;