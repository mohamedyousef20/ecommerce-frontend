import { GET_ALL_SUB_CATEGORY, GET_ONE_SUB_CATEGORY, UPDATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, CREATE_SUB_CATEGORY } from "../type"

const initial = {
    subcategory: [],
    allSubcategory: [],
    deleteSubcategory: [],
    getOneSubcategory: [],
    updateSubcategory: [],
    loading: true,
};

const subcategoryReducer = (state = initial, action) => {

    switch (action.type) {
        case CREATE_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                loading: false,
            }
        case GET_ALL_SUB_CATEGORY:
            return {
                ...state,
                allSubcategory: action.payload,
                loading: false,
            }
        case DELETE_SUB_CATEGORY:
            return {
                ...state,
                deleteSubcategory: action.payload,
                loading: false,
            }

        case GET_ONE_SUB_CATEGORY:
            return {
                ...state,
                getOneSubcategory: action.payload,
                loading: false,
            }


        case UPDATE_SUB_CATEGORY:
            return {
                ...state,
                updateSubcategory: action.payload,
                loading: false,
            }

        // case GET_ERROR:
        //     return {
        //         category: action.payload,
        //         loading: true,
        //     }
        default:
            return state;

    }
};

export default subcategoryReducer