import {
    GET_ERROR, UPDATE_PRODUCT, CREATE_PRODUCT, GET_ALL_PRODUCT,
    GET_PRODUCT_USER_LIKE, GET_PRODUCT, DELETE_PRODUCT,
    GET_ALL_PRODUCT_IN_CATEGORY,
    GET_MOST_POPULAR_PRODUCT,
    GET_ALL_PRODUCT_SEARCH,
    GET_MOST_OFFERED_PRODUCT
} from "../type"

const initial = {
    product: [],
    oneProduct: [],
    allProduct: [],
    allProductSearch: [],
    allProductInCate: [],
    mostPopularProduct: [],
    mostOfferedProduct: [],
    ProductYouLike: [],
    deleteProduct: [],
    updateProduct: [],
    loading: true,
};

const productReducer = (state = initial, action) => {

    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false,
            }
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProduct: action.payload,
                loading: false,
            }
        case GET_ALL_PRODUCT_IN_CATEGORY:
            return {
                ...state,
                allProductInCate: action.payload,
                loading: false,
            }
        case GET_MOST_POPULAR_PRODUCT:
            return {
                ...state,
                mostPopularProduct: action.payload,
                loading: false,
            }

        case GET_MOST_OFFERED_PRODUCT:
            return {
                ...state,
                mostOfferedProduct: action.payload,
                loading: false,
            }
        case GET_ALL_PRODUCT_SEARCH:
            return {
                ...state,
                allProductSearch: action.payload,
                loading: false,
            }
        case GET_PRODUCT:
            return {
                oneProduct: action.payload,
                loading: false,
            }
        case GET_PRODUCT_USER_LIKE:
            return {
                ...state,
                ProductYouLike: action.payload,
                loading: false,
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: action.payload,
                loading: false,
            }

        case UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: action.payload,
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

export default productReducer