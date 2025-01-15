import {
    Add_Product_TO_WISH_LIST
    , DELETE_PRODUCT_FROM_WISHLIST, GET_ALL_PRODUCT_IN_WHISH_LIST, GET_ERROR
} from "../type"

const initial = {
    allProductInWishList: [],
    addProductTOWishList: [],
    deleteProductFromWishList: [],

    loading: true,
};

const wishListReducer = (state = initial, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCT_IN_WHISH_LIST:
            return {
                ...state,
                allProductInWishList: action.payload,
                loading: false,
            }

        case Add_Product_TO_WISH_LIST:
            return {
                ...state,
                addProductTOWishList: action.payload,
                loading: false,
            }
        case DELETE_PRODUCT_FROM_WISHLIST:
            return {
                ...state,
                deleteProductFromWishList: action.payload,
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

export default wishListReducer