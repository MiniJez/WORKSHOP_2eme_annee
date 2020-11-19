const express = require('express')
const cors = require('cors')


// EXPRESS SETUP
const app = express()
const port = 3005
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());


// IMPORTS
const { getAllSensorsData, getAllUserID, getUserInfo, getSensorInfos, getAlertInfos, updateAlert, insertAlert, getRawData, getStats, getAlertInfosSort, authUser, verifyToken } = require('./functions');
const { handleConnection } = require('./connection');


// Auth midlleware
const authMiddleware = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    await verifyToken(token, res);
    next();
};

const unless = (path, middleware) => {
    return async (req, res, next) => {
        if (path === req.path) {
            return next();
        } else {
            return await middleware(req, res, next);
        }
    };
};

app.use(unless('/login', authMiddleware));


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let token = await authUser(email, password);
        res.send({token});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.get('/getSensors', async (req, res) => {
    try {
        let sensors = await getAllSensorsData();
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getSensorsUserID', async (req, res) => {
    try {
        let usersID = await getAllUserID();
        res.send(usersID);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getRawData', async (req, res) => {
    try {
        let rawData = await getRawData();
        res.send(rawData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.post('/getRawData', async (req, res) => {
    const { limit, sort } = req.body;
    try {
        let rawData = await getRawData(limit, sort);
        res.send(rawData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getSensors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let userInfos = await getUserInfo(id);
        res.send(userInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getRawData/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let sensorInfos = await getSensorInfos(id);
        res.send(sensorInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getAlerts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let alertInfos = await getAlertInfos(id);
        res.send(alertInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.post('/getAlerts', async (req, res) => {
    const { sort } = req.body;
    try {
        let alertInfos = await getAlertInfosSort(sort);
        res.send(alertInfos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.post('/updateAlerts/:id', async (req, res) => {
    const { id } = req.params;
    const { update } = req.body;
    try {
        await updateAlert(id, update);
        res.send('OK');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.post('/insertAlerts', async (req, res) => {
    const { alert } = req.body;
    try {
        await insertAlert(alert);
        res.send('OK');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.get('/getStats', async (req, res) => {
    try {
        let stats = await getStats();
        res.send(stats);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    handleConnection();
})