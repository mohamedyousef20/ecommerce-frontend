import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData } from "../../Hooks/useGetData";

import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import { useUpdateDataWithImage } from "../../Hooks/useUpdateData";
import {
    GET_ALL_BRAND,
    DELETE_BRAND,
    CREATE_BRAND,
    UPDATE_BRAND,
    GET_ONE_BRAND
} from "../type";


// get all category action
export const getAllBrand = (
    page = 1,
    
    keyword = '',
    sort = '',
    fields = ''
) => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/brand?page=${page}&keyword=${keyword}&sort=${sort}&fields=${fields}`)

        dispatch({
            type: GET_ALL_BRAND,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ALL_BRAND,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

// get all category action with pagination

// get all category action
// export const getAllCategoryWithPagination = (page) => async (dispatch) => {

//     try {
//         const response = await useGetData(`/api/vi/category?page=${page}`)

//         dispatch({
//             type: GET_ALL_CATEGORY,
//             payload: response,
//         })
//     }

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }




// crate category action

export const createBrand = (formData) => async (dispatch) => {

    try {
        const response = await useInsertDataWithImage('/api/vi/brand', formData);
        console.log(response)
        dispatch({
            type: CREATE_BRAND,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: CREATE_BRAND,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// crate category action

export const deleteBrand = (id) => async (dispatch) => {

    try {
        const response = await useDeleteData(`/api/vi/brand/${id}`)
        dispatch({
            type: DELETE_BRAND,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_BRAND,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// get all category action
export const editBrand = (id, formData) => async (dispatch) => {

    try {
        const response = await useUpdateDataWithImage(`/api/vi/brand/${id}`, formData)

        dispatch({
            type: UPDATE_BRAND,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_BRAND,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// get one category

// get all category action
export const getOneBrand = (id) => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/brand/${id}`)

        dispatch({
            type: GET_ONE_BRAND,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ONE_BRAND,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}