import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer'
import loadingReducer from './reducers/loadingReducer'
import sensorReducer from './reducers/sensorReducer'



const rootReducer = combineReducers(
    { 
        loginReducer,
        loadingReducer,
        sensorReducer
    }
);


const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}


export default configureStore;