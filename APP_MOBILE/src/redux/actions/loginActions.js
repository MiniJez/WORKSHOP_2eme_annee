import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actionsTypes/loginAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        fetch('https://eclisson.duckdns.org/ConnectedCity/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,

            })
        })
            .then((response) => { return response.json() })
            .then((response) => {
                AsyncStorage.setItem('token', response.token).then(() => {
                    dispatch({ type: LOGIN_SUCCESS, payload: { email, token: response.token } });
                })
            })
            .catch((error) => {
                dispatch({ type: LOGIN_FAILURE, payload: error });
            });
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: LOGOUT_REQUEST });

        AsyncStorage.removeItem('token').then(() => {
            dispatch({ type: LOGOUT_SUCCESS });
        }).catch((error => {
            dispatch({ type: LOGOUT_FAILURE, payload: error });
        }))
    }
}