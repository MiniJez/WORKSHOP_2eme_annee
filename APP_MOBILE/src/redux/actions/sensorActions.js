import { SENSOR_REQUEST, SENSOR_SUCCESS, SENSOR_FAILURE} from '../actionsTypes/sensorAction'
import {SensorId} from '../../constants/SensorId'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const sensor = () => {
    return async (dispatch) => {
        dispatch({type: SENSOR_REQUEST });
        let token = await AsyncStorage.getItem('token')
        fetch(`https://eclisson.duckdns.org/ConnectedCity/getAlerts/${SensorId.sensor1}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then((response) => { return response.json()})
            .then((response)=> {
                console.log(response);
               dispatch({type: SENSOR_SUCCESS, payload: response}); 
            })
            .catch((error)=> {
                dispatch({type: SENSOR_FAILURE, payload: error});
            });
    }
}

export const sensorUpdate = (sensorData) => {
    return async (dispatch) => {
        dispatch({type: SENSOR_UPDATE_REQUEST });
        let token = await AsyncStorage.getItem('token')
        fetch(`https://eclisson.duckdns.org/ConnectedCity/updateAlerts/${SensorId.sensor1}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                update: sensorData,
            })
        })
            .then((response) => {
                dispatch({ type: SENSOR_UPDATE_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: SENSOR_UPDATE_FAILURE });
            });
    }
}


