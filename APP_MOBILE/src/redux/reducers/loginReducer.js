import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, SET_TOKEN } from '../actionsTypes/loginAction'


const initialState = {
    token: "",
    email: ""
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email
            };

        case LOGOUT_SUCCESS:
            return initialState

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        
        default:
            return state;
    }
}

export default loginReducer;