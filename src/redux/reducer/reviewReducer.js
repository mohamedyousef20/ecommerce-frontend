import {
    CREATE_REVIEW,
    GET_ALL_REVIEW,
    UPDATE_USER_REVIEW,
    DELETE_USER_REVIEW,
    GET_ERROR
} from "../type"

const initial = {
    createReview: [],
    getAllReview: [],
    updateReview: [],
    deleteReview: [],
    ProductYouLike: [],
    deleteProduct: [],
    loading: true,
};

const reviewReducer = (state = initial, action) => {

    switch (action.type) {
        case CREATE_REVIEW:
            return {
                ...state,
                createReview: action.payload,
                loading: false,
            }
        case GET_ALL_REVIEW:
            return {
                ...state,
                getAllReview: action.payload,
                loading: false,
            }
        case UPDATE_USER_REVIEW:
            return {
                updateReview: action.payload,
                loading: false,
            }
        case DELETE_USER_REVIEW:
            return {
                ...state,
                deleteReview: action.payload,
                loading: false,
            }

        // case DELETE_PRODUCT:
        //     return {
        //         ...state,
        //         deleteProduct: action.payload,
        //         loading: false,
        //     }

        // case UPDATE_PRODUCT:
        //     return {
        //         ...state,
        //         updateProduct: action.payload,
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

export default reviewReducer