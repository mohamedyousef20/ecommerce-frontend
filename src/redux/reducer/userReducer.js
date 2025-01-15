import {
    GET_ERROR, GET_ALL_USER,
    GET_CURRENT_USER,
    CREATE_USER,
    GET_USER,
    UPDATE_USER_PROFILE,
    DEACTIVATE_MY_ACCOUNT,
    CHANGE_MY_PASSWORD,
    DELETE_MY_ACCOUNT
} from "../type"

const initial = {
    user: [],
    createUser: [],
    getOneUser: [],
    loggedUser: [],
    userProfile: [],
    deActiveMyAccount: [],
    deleteMyAccount: [],
    changeMyPassword: [],


  
    loading: true,
};

const userReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }

        case GET_CURRENT_USER:
            return {
                ...state,
                loggedUser: action.payload,
                loading: false,
            }

        case GET_USER:
            return {
                ...state,
                getOneUser: action.payload,
                loading: false,
            }

        case UPDATE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                loading: false,
            }

        case DEACTIVATE_MY_ACCOUNT:
            return {
                ...state,
                deActiveMyAccount: action.payload,
                loading: false,
            }


        case DELETE_MY_ACCOUNT:
            return {
                ...state,
                deleteMyAccount: action.payload,
                loading: false,
            }


        case CHANGE_MY_PASSWORD:
            return {
                ...state,
                changeMyPassword: action.payload,
                loading: false,
            }


        case CREATE_USER:
            return {
                ...state,
                createUser: action.payload,
                loading: false,
            }

        case GET_ERROR:
            return {
                product: action.payload,
                loading: true,
            }
        default:
            return state;
        // case GET_PRODUCT_USER_LIKE:
        //     return {
        //         ...state,
        //         ProductYouLike: action.payload,
        //         loading: false,
        //     }


    }
};

export default userReducer