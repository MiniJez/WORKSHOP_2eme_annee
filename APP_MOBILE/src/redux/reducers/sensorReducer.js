import { SENSOR_SUCCESS, SENSOR_REQUEST, SENSOR_FAILURE } from '../actionsTypes/sensorAction'


const initialState = {
    alert: [],
    SensorID: ""
};

const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SENSOR_SUCCESS:
            console.log(action)

            return {
                ...state,
                alert: action.payload[0].alert,
                SensorID: action.payload[0].SensorID
            };

        case SENSOR_FAILURE:
            return initialState
        default:
            return state;
    }
}

export default sensorReducer;