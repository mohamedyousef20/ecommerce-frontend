import { LOGIN_USER, REGISTER_USER, FORGET_PASSWORD, GET_ERROR, VERIFY_RESET_PASSWORD_CODE, RESET_PASSWORD, GET_Logged_USER_DATA } from "../type"

const initial = {
    register: [],
    login: [],
    forgetPassword: [],
    verifyRestCode: [],
    resetPassword: [],
    loading: true,
};

const authReducer = (state = initial, action) => {

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                login: action.payload,
                loading: false,
            }

        case REGISTER_USER:
            return {
                ...state,
                register: action.payload,
                loading: false,
            }

        case FORGET_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload,
                loading: false,
            }
        case VERIFY_RESET_PASSWORD_CODE:
            return {
                ...state,
                verifyRestCode: action.payload,
                loading: false,
            }

        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: action.payload,
                loading: false,
            }
        
        case GET_ERROR:
            return {
                auth: action.payload,
                loading: true,
            }
        default:
            return state;

    }
};

export default authReducer