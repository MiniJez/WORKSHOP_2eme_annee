const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId, // id unique
    lat : mongoose.Schema.Types.Decimal128, // float de latitude
    lon : mongoose.Schema.Types.Decimal128, // float de longitude
    address : String, // adresse complete
    userID: String, // UUIDV4
    sensorID: [String] // List permet de faire le lien avec l'autre table 
})

module.exports = mongoose.model('sensors', schema);
