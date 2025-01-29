import {
    GET_ALL_ORDER,
    GET_ONE_ORDER,
    GET_ERROR, CREATE_ORDER,
    UPDATE_ORDER_DELIVER,
    UPDATE_ORDER_PAY,
    UPDATE_ORDER_PAYMENT_METHOD,
    DELETE_ORDER,
    CANCEL_ORDER,
    ACTIVE_ORDER
} from "../type";


const initial = {
    allOrder: [],
    createOrder: [],
    getOneOrder: [],
    updateOrderPay: [],
    updateOrderPaymentMethod: [],
    updateOrderDeliver: [],
    deleteOrder: [],
    cancelOrder: [],
    activeOrder: [],





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
        case GET_ONE_ORDER:
            return {
                ...state,
                getOneOrder: action.payload,
                loading: false,
            }
        case UPDATE_ORDER_PAY:
            return {
                ...state,
                updateOrderPay: action.payload,
                loading: false,
            }

        case UPDATE_ORDER_PAYMENT_METHOD:
            return {
                ...state,
                UPDATE_ORDER_PAYMENT_METHOD: action.payload,
                loading: false,
            }


        case UPDATE_ORDER_DELIVER:
            return {
                ...state,
                updateOrderDeliver: action.payload,
                loading: false,
            }

        case CANCEL_ORDER:
            return {
                ...state,
                cancelOrder: action.payload,
                loading: false,
            }

        case ACTIVE_ORDER:
            return {
                ...state,
                activeOrder: action.payload,
                loading: false,
            }

        case DELETE_ORDER:
            return {
                ...state,
                deleteOrder: action.payload,
                loading: false,
            }

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