const express = require('express')


// EXPRESS SETUP
const app = express()
const port = 3000


// IMPORTS
const { connectToDb, disconnectFromDb, getSensorsData } = require('./functions');


app.get('/getSensors', async (req, res) => {
    try {
        await connectToDb();
        let sensors = await getSensorsData();
        await disconnectFromDb();
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})