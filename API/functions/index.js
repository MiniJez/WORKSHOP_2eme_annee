require('dotenv').config()


// IMPORTS
const { Sensors } = require('../models/sensors');
const { RawData } = require('../models/rawData');
const { Alert } = require('../models/alert');


const getAllSensorsData = async () => {
    try{
        console.log("getSensors/");
        let doc = await Sensors.find({});
        console.log("done")
        return doc;
    }catch(error) {
        console.log(error);
    }
}


const getAllUserID = async () => {
    try {
        console.log("getSensorsUserID/");
        let doc = await Sensors.find({}, 'userID');
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getUserInfo = async (userID) => {
    try {
        console.log("getUsers/:id");
        let doc = await Sensors.find({userID});
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getRawData = async (limit = null, sort = null) => {
    try {
        console.log("getRawData/");
        let doc;
        if(limit, sort) {
            doc = await RawData.find({}).sort({_id: sort}).limit(limit);;
        }else {
            doc = await RawData.find({});
        }
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getSensorInfos = async (sensorID) => {
    try {
        console.log("getSensors/:id");
        let doc = await RawData.find({sensorID});
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getAlertInfosSort = async (sort) => {
    try {
        console.log(sort)
        console.log("getAlerts/");
        let doc = await Alert.find(sort);
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getAlertInfos = async (id) => {
    try {
        console.log("getAlerts/:id");
        let doc = await Alert.find({sensorID: id});
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const updateAlert = async (id, update) => {
    try {
        console.log("updateAlerts/:id");
        await Alert.findOneAndUpdate({sensorID: id}, update, {useFindAndModify: false});
        console.log("done");
    } catch (error) {
        console.log(error);
    }
}


const insertAlert = async (alert) => {
    try {
        console.log("insertAlerts/");
        await Alert.create(alert);
        console.log("done");
    } catch (error) {
        console.log(error);
    }
}


const getStats = async () => {
    try {
        console.log("getStats/");
        let rawDataCount = await RawData.estimatedDocumentCount();
        let sensorsCount = await Sensors.estimatedDocumentCount();
        let alertsCount = await Alert.estimatedDocumentCount();
        console.log("done");
        return({rawDataCount, sensorsCount, alertsCount});
    } catch (error) {
        console.log(error);
    }
}


module.exports.getAllSensorsData = getAllSensorsData;
module.exports.getAllUserID = getAllUserID;
module.exports.getUserInfo = getUserInfo;
module.exports.getSensorInfos = getSensorInfos;
module.exports.getAlertInfos = getAlertInfos;
module.exports.updateAlert = updateAlert;
module.exports.insertAlert = insertAlert;
module.exports.getRawData = getRawData;
module.exports.getStats = getStats;
module.exports.getAlertInfosSort = getAlertInfosSort;