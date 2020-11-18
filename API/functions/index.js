require('dotenv').config()
const jwt = require('jsonwebtoken');
const { sha512 } = require('js-sha512');
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')
const EventEmitter = require('events');


// IMPORTS
const { Sensors } = require('../models/sensors');
const { RawData } = require('../models/rawData');
const { Alert } = require('../models/alert');
const { User } = require('../models/user');


//MQTT EMITTER
const mqttEmitter = new EventEmitter();
client.on('connect', function () {
    mqttEmitter.on('SendMqttNotif', (alert) => {
        client.publish('ConnectedCity/dbb500af-8c53-488a-a64a-04b4618b503b', JSON.stringify(alert))
    });
})


const verifyToken = async (token, res) => {
    console.log('verifiyToken');
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) resolve(res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }));
            console.log(decoded)
            User.findById(decoded.id, (err, response) => {
                if(err) resolve(res.status(500).send({ auth: false, message: 'Failed to authenticate user.' }));
                console.log(response);
                if(!response) {
                    resolve(res.status(401).send({ auth: false, message: 'Auth failed' }));
                }
                resolve();
            });
        });
    })
}


const authUser = async (email, password) => {
    try {
        console.log("login/");
        let hashedPassword = sha512(password);
        let user = await User.find({email, password: hashedPassword});
        if(!user.length || !user) {
            console.log('create user')
            user = await User.create({email, password: hashedPassword});
        }
        console.log(user);
        let token = jwt.sign({ id: user._id || user[0]._id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}


const getAllSensorsData = async () => {
    try {
        console.log("getSensors/");
        let doc = await Sensors.find({});
        console.log("done")
        return doc;
    } catch (error) {
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
        let doc = await Sensors.find({ userID });
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
        if (limit, sort) {
            doc = await RawData.find({}).sort({ time: sort }).limit(limit);;
        } else {
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
        let doc = await RawData.find({ sensorID });
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const getAlertInfosSort = async (sort) => {
    const [entries] = Object.entries(sort)
    try {
        const docs = await Alert.aggregate([
            {
                $match: {
                    [entries[0]]: entries[1]
                }
            },
            {
                $lookup: {
                    from: 'RawData',
                    localField: 'SensorID',
                    foreignField: 'sensorID',
                    as: 'RawData'
                }
            }
        ])
        return (docs)
    } catch (error) {
        console.log(error);
    }
}


const getAlertInfos = async (id) => {
    try {
        console.log("getAlerts/:id");
        let doc = await Alert.find({SensorID: id});
        console.log("done");
        return doc;
    } catch (error) {
        console.log(error);
    }
}


const updateAlert = async (id, update) => {
    try {
        console.log("updateAlerts/:id");
        await Alert.findOneAndUpdate({ sensorID: id }, update, { useFindAndModify: false });
        console.log("done");
    } catch (error) {
        console.log(error);
    }
}


const insertAlert = async (alert) => {
    try {
        console.log("insertAlerts/");
        //await Alert.create(alert);
        mqttEmitter.emit('SendMqttNotif', alert);
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
        return ({ rawDataCount, sensorsCount, alertsCount });
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
module.exports.authUser = authUser;
module.exports.verifyToken = verifyToken;