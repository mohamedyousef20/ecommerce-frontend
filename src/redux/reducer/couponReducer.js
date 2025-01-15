import {
    CREATE_COUPON,
    GET_ALL_COUPON,
    GET_COUPON,
    UPDATE_COUPON,
    DELETE_COUPON,
    GET_ERROR,
} from "../type"

const initial = {
    getAllCoupon: [],
    createCoupon: [],
    editCoupon: [],
    getOneCoupon: [],
    deleteCoupon: [],
    loading: true,
};

const couponReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_COUPON:
            return {
                ...state,
                getAllCoupon: action.payload,
                loading: false,
            }
        case GET_COUPON:
            return {
                ...state,
                getOneCoupon: action.payload,
                loading: false,
            }
        case CREATE_COUPON:
            return {
                ...state,
                createCoupon: action.payload,
                loading: false,
            }
        case UPDATE_COUPON:
            return {
                ...state,
                editCoupon: action.payload,
                loading: false,
            }
        case DELETE_COUPON:
            return {
                ...state,
                deleteCoupon: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                coupon: action.payload,
                loading: true,
            }
        default:
            return state;

    }
};

export default couponReducer