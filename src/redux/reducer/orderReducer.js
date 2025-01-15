import { GET_ALL_ORDER, GET_ERROR, CREATE_ORDER } from "../type";


const initial = {
    allOrder: [],
    createOrder: [],
    getOneOrder: [],
    loggedOrder: [],





    loading: true,
};

const orderReducer = (state = initial, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                createOrder: action.payload,
                loading: false,
            }

        case GET_ALL_ORDER:
            return {
                ...state,
                allOrder: action.payload,
                loading: false,
            }

        // case GET_USER:
        //     return {
        //         ...state,
        //         getOneUser: action.payload,
        //         loading: false,
        //     }

        // case UPDATE_USER_PROFILE:
        //     return {
        //         ...state,
        //         userProfile: action.payload,
        //         loading: false,
        //     }

        // case DEACTIVATE_MY_ACCOUNT:
        //     return {
        //         ...state,
        //         deActiveMyAccount: action.payload,
        //         loading: false,
        //     }


        // case DELETE_MY_ACCOUNT:
        //     return {
        //         ...state,
        //         deleteMyAccount: action.payload,
        //         loading: false,
        //     }


        // case CHANGE_MY_PASSWORD:
        //     return {
        //         ...state,
        //         changeMyPassword: action.payload,
        //         loading: false,
        //     }


        // case CREATE_USER:
        //     return {
        //         ...state,
        //         createUser: action.payload,
        //         loading: false,
        //     }

        case GET_ERROR:
            return {
                product: action.payload,
                loading: true,
            }
        default:
            return state;



    }
};

export default orderReducer