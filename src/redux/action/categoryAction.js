import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData } from "../../Hooks/useGetData";

import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import { useUpdateDataWithImage } from "../../Hooks/useUpdateData";
import {
    GET_ALL_CATEGORY,
    GET_ERROR,
    DELETE_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    GET_ONE_CATEGORY
} from "../type";


// get all category action
export const getAllCategory = () => async (dispatch) => {

    try {
        const response = await useGetData('/api/vi/category')
console.log('the response of category',response)
        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ERROR,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

// get all category action with pagination

// get all category action
export const getAllCategoryWithPagination = (page) => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/category?page=${page}`)

        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ERROR,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}




// crate category action

export const createCategory = (formData) => async (dispatch) => {

    try {
        const response = await useInsertDataWithImage('/api/vi/category', formData)
        dispatch({
            type: CREATE_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ERROR,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// crate category action

export const deleteCategory = (id) => async (dispatch) => {

    try {
        const response = await useDeleteData(`/api/vi/category/${id}`)
        dispatch({
            type: DELETE_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// get all category action
export const editCategory = (id, formData) => async (dispatch) => {

    try {
        const response = await useUpdateDataWithImage(`/api/vi/category/${id}`, formData)

        dispatch({
            type: UPDATE_CATEGORY,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// get one category

// get all category action
export const getOneCategory = (id) => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/category/${id}`)

        dispatch({
            type: GET_ONE_CATEGORY,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ONE_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}