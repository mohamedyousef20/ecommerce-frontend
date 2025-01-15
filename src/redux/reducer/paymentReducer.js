import { CREATE_ORDER_CASH, CREATE_ORDER_VISA } from '../type'

const initial = {
    createOrderCash: [],
    createOrderCard: [],
}
const checkoutReducer = (state = initial, action) => {
    switch (action.type) {
        case CREATE_ORDER_CASH:
            return {
                ...state,
                createOrderCash: action.payload,
            }
        case CREATE_ORDER_VISA:
            return {
                ...state,
                createOrderCard: action.payload,
            }
        default:
            return state;
    }
}
export default checkoutReducer