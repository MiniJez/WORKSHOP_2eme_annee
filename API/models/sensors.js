const mongoose = require('mongoose');


const SensorsSchema = new mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId, // id unique
    lat : Number, // float de latitude
    lon : Number, // float de longitude
    address : String, // adresse complete
    userID: String, // UUIDV4
    sensorID: [String] // List permet de faire le lien avec l'autre table 
})


module.exports.SensorsSchema = SensorsSchema;