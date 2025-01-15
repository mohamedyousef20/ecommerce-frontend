import { GET_SUB_CATEGORY } from "../type"

const initial = {
    category: [],
    loading: true,
};

const subcategoryReducer = (state = initial, action) => {

    switch (action.type) {
        case GET_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                loading: false,
            }
        // case CREATE_CATEGORY:
        //     return {
        //         ...state,
        //         category: action.payload,
        //         loading: false,
        //     }

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