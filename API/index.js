const express = require('express')


// EXPRESS SETUP
const app = express()
const port = 3005


// IMPORTS
const { getAllSensorsData, getAllUserID, getUserInfo, getSensorInfos } = require('./functions');


app.get('/getAllSensorsData', async (req, res) => {
    try {
        let sensors = await getAllSensorsData();
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getAllUserID', async (req, res) => {
    try {
        let usersID = await getAllUserID();
        res.send(usersID);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getUserInfos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let userInfos = await getUserInfo(id);
        res.send(userInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getSensorInfos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let sensorInfos = await getSensorInfos(id);
        res.send(sensorInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})