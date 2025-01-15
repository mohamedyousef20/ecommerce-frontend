import {
    GET_ALL_CATEGORY,
    GET_ERROR,
    DELETE_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    GET_ONE_CATEGORY
} from "../type"

const initial = {
    category: [],
    allCategory: [],
    deleteCategory: [],
    editCategory: [],
    getOneCategory: [],
    loading: true,
};

const categoryReducer = (state = initial, action) => {

    switch (action.type) {
        case GET_ALL_CATEGORY:
            return {
                ...state,
                allCategory: action.payload,
                loading: false,
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            }

        case DELETE_CATEGORY:
            return {
                ...state,
                deleteCategory: action.payload,
                loading: false,
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                editCategory: action.payload,
                loading: false,
            }

        case GET_ONE_CATEGORY:
            return {
                ...state,
                getOneCategory: action.payload,
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

export default categoryReducer