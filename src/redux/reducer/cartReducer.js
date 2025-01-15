import { Add_Product_TO_CART, GET_USER_CART, 
    GET_ERROR, UPDATE_PRODUCT_IN_CART,
     DELETE_PRODUCT_FROM_CART, 
     APPLY_COUPON_TO_CART} from "../type"

const initial = {
    cart: [],
    userCart:[],
    deleteProdFromCart:[],
    updateProdInCart:[],
    coupon:[],
    loading: true,
    
};

const cartReducer = (state = initial, action) => {

    switch (action.type) {
        case Add_Product_TO_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false,
            }
        case GET_USER_CART:
            return {
                ...state,
                userCart: action.payload,
                loading: false,
            }
        case DELETE_PRODUCT_FROM_CART:
            return {
                ...state,
                deleteProdFromCart: action.payload,
                loading: false,
            }
        case UPDATE_PRODUCT_IN_CART:
            return {
                ...state,
                updateProdInCart: action.payload,
                loading: false,
            }

        case APPLY_COUPON_TO_CART:
            return {
                ...state,
                coupon: action.payload,
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

export default cartReducer