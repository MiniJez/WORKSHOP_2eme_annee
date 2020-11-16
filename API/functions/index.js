const mongoose = require('mongoose');
require('dotenv').config()


// IMPORTS
const { Sensors } = require('../models/sensors');
const { RawData } = require('../models/rawData');


const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true });
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


const getAllSensorsData = async () => {
    try{
        await connectToDb();
        let doc = await Sensors.find({});
        await disconnectFromDb();
        return doc;
    }catch(error) {
        console.log(error);
    }
}


const getAllUserID = async () => {
    try {
        await connectToDb();
        let doc = await Sensors.find({}, 'userID');
        await disconnectFromDb();
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getUserInfo = async (userID) => {
    try {
        await connectToDb();
        let doc = await Sensors.find({userID});
        await disconnectFromDb();
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getSensorInfos = async (sensorID) => {
    try {
        await connectToDb();
        let doc = await RawData.find({sensorID});
        await disconnectFromDb();
        return doc;
    } catch (error) {
        console.log(error);
    }
}


module.exports.connectToDb = connectToDb;
module.exports.disconnectFromDb = disconnectFromDb;
module.exports.getAllSensorsData = getAllSensorsData;
module.exports.getAllUserID = getAllUserID;
module.exports.getUserInfo = getUserInfo;
module.exports.getSensorInfos = getSensorInfos;