import {
    GET_ALL_BRAND,
    GET_ERROR,
    DELETE_BRAND,
    CREATE_BRAND,
    UPDATE_BRAND,
    GET_ONE_BRAND
} from "../type"

const initial = {
    createBrand: [],
    allBrand: [],
    deleteBrand: [],
    editBrand: [],
    getOneBrand: [],
    loading: true,
};

const brandReducer = (state = initial, action) => {

    switch (action.type) {
        case GET_ALL_BRAND:
            return {
                ...state,
                allBrand: action.payload,
                loading: false,
            }
        case CREATE_BRAND:
            return {
                ...state,
                createBrand: action.payload,
                loading: false,
            }

        case DELETE_BRAND:
            return {
                ...state,
                deleteBrand: action.payload,
                loading: false,
            }
        case UPDATE_BRAND:
            return {
                ...state,
                editBrand: action.payload,
                loading: false,
            }

        case GET_ONE_BRAND:
            return {
                ...state,
                getOneBrand: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                category: action.payload,
                loading: true,
            }
        default:
            return state;

    }
};

export default brandReducer