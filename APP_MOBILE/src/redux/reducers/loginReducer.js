import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actionsTypes/loginAction'


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
        default:
            return state;
    }
}

export default loginReducer;