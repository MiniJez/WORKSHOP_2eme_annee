import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer'
import loadingReducer from './reducers/loadingReducer'


const rootReducer = combineReducers(
    { 
        loginReducer,
        loadingReducer
    }
);


const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}


export default configureStore;