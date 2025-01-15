
import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData, useGetDataToken } from "../../Hooks/useGetData";

import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import { useUpdateData, useUpdateDataWithImage } from "../../Hooks/useUpdateData";
import {
    GET_ERROR, CREATE_ANNOUNCEMENT,
    DELETE_ANNOUNCEMENT,
    GET_ALL_ANNOUNCEMENT,
    UPDATE_ANNOUNCEMENT,
    GET_ONE_ANNOUNCEMENT,
    GET_ALL_ANNOUNCEMENT_HOME_PAGE
} from "../type";


// // get all category action
// export const getAllCategory = () => async (dispatch) => {

//     try {
//         const response = await useGetData('/api/vi/category')

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

// get all category action with pagination

// // get all category action
// export const getAllCategoryWithPagination = (page) => async (dispatch) => {

//     try {
//         const response = await useGetData(`/api/vi/category?page=${page} `)

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

export const createAnnouncement = (formData) => async (dispatch) => {
    console.log(formData)
    try {
        const response = await useInsertDataWithImage('/api/vi/announcement', formData)
        dispatch({
            type: CREATE_ANNOUNCEMENT,
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

export const getAllAnnouncement = () => async (dispatch) => {
    try {
        const response = await useGetDataToken('/api/vi/announcement');
        console.log("response of ann ", response)
        dispatch({
            type: GET_ALL_ANNOUNCEMENT,
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


export const getAnnouncementHomePage = () => async (dispatch) => {
    try {
        const response = await useGetData('/api/vi/announcement?isActive=true');
        console.log("response of ann ", response)
        dispatch({
            type: GET_ALL_ANNOUNCEMENT_HOME_PAGE,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ALL_ANNOUNCEMENT_HOME_PAGE,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// delete category action

export const deleteAnnouncement = (id) => async (dispatch) => {
    console.log("id", id)
    try {
        const response = await useDeleteData(`/api/vi/announcement/${id}`)
        console.log(response)
        dispatch({
            type: DELETE_ANNOUNCEMENT,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_ANNOUNCEMENT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// delete category action

export const editAnnouncement = (id, formData) => async (dispatch) => {
    console.log("id", id)
    try {
        const response = await useUpdateDataWithImage(`/api/vi/announcement/${id}`, formData)
        console.log(response)
        dispatch({
            type: UPDATE_ANNOUNCEMENT,
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


// get one ann 


export const getOneAnnouncement = (id) => async (dispatch) => {
    console.log("id", id)
    try {
        const response = await useGetDataToken(`/api/vi/announcement/${id}`)
        console.log(response)
        dispatch({
            type: GET_ONE_ANNOUNCEMENT,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ONE_ANNOUNCEMENT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}
