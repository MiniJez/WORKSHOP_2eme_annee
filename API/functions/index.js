const mongoose = require('mongoose');
require('dotenv').config()


// IMPORTS
const { SensorsSchema } = require('../models/sensors');


const connectToDb = async () => {
    try{
        console.log('co...')
        await mongoose.connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log('Connected');
            }
        });
    }catch(error) {
        console.log(error);
    }
}


const disconnectFromDb = async () => {
    try{
        await mongoose.disconnect();
    }catch(error) {
        console.log(error);
    }
}


const getSensorsData = async () => {
    try{
        const Sensors = mongoose.model('Sensors', SensorsSchema);
        let doc = await Sensors.find();
        console.log(doc);
        return doc;
    }catch(error) {
        console.log(error);
    }
}


module.exports.connectToDb = connectToDb;
module.exports.disconnectFromDb = disconnectFromDb;
module.exports.getSensorsData = getSensorsData;