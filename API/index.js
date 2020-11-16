const express = require('express')


// EXPRESS SETUP
const app = express()
const port = 3000


// IMPORTS
const { connectToDb, disconnectFromDb, getSensorsData } = require('./functions');


app.get('/getAllSensorsData', async (req, res) => {
    try {
        let sensors = await getSensorsData();
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})