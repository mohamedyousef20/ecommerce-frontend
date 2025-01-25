// export const createSubCategory = () => async (dispatch) => {

import useDeleteData from "../../Hooks/useDeleteData"
import { useUpdateData } from "../../Hooks/useUpdateData"

const { default: useGetData, useGetDataToken } = require("../../Hooks/useGetData")
const { InsertData } = require("../../Hooks/useInsertData")
const { GET_SUB_CATEGORY, CREATE_SUB_CATEGORY, GET_ALL_SUB_CATEGORY, DELETE_SUB_CATEGORY, GET_ONE_SUB_CATEGORY, UPDATE_SUB_CATEGORY } = require("../type")
const { GET_ERROR } = require("../type")



export const createSubCategory = (data) => async (dispatch) => {

    try {
        const response = await InsertData('/api/vi/subcategory', data)

        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }
    catch (err) {
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}

export const getAllSubCategory = () => async (dispatch) => {

    try {
        const response = await useGetDataToken('/api/vi/subcategory');
        console.log(response)
        dispatch({
            type: GET_ALL_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }
    catch (err) {
        dispatch({
            type: GET_ALL_SUB_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }


// get all subcategory belong to category

export const getSubcateOnCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/vi/category/${id}/subcategories`)

        dispatch({
            type: GET_SUB_CATEGORY,
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

export const deleteSubcateOnCategory = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/vi/subcategory/${id}`)

        dispatch({
            type: DELETE_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_SUB_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}


export const getOneSubcateOnCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/vi/subcategory/${id}`)

        dispatch({
            type: GET_ONE_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ONE_SUB_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}


export const editSubcateOnCategory = (id,data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/subcategory/${id}`,data)

        dispatch({
            type: UPDATE_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_SUB_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}