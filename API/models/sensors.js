const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');

const sensors = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId, // id unique
    lat : mongoose.Schema.Types.Decimal128, // float de latitude
    lon : mongoose.Schema.Types.Decimal128, // float de longitude
    address : String, // adresse complete
    userID: String, // UUIDV4
    sensorID: [mongoose.Schema.Types.String] // List permet de faire le lien avec l'autre table 
})
