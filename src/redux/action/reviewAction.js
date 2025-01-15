import useDeleteData from "../../Hooks/useDeleteData"
import { useGetDataToken } from "../../Hooks/useGetData"
import { useInsertData } from "../../Hooks/useInsertData"
import { useUpdateData } from "../../Hooks/useUpdateData"
import { CREATE_REVIEW, GET_ALL_REVIEW, UPDATE_USER_REVIEW } from "../type"





// create review action
export const createReview = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/vi/review`, data)
        console.log(response)
        dispatch({
            type: CREATE_REVIEW,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: CREATE_REVIEW,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// get all review for product action
export const getAllReview = (id) => async (dispatch) => {

    try {
        const response = await useGetDataToken(`/api/vi/product/${id}/review`)
        dispatch({
            type: GET_ALL_REVIEW,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ALL_REVIEW,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}




// edit review action
export const editReview = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/review/${id}`, data)
        console.log(response)
        dispatch({
            type: UPDATE_USER_REVIEW,
            payload: response,
        })


    }

    catch (err) {
        dispatch({
            type: UPDATE_USER_REVIEW,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// delete review action
export const deleteReview = (id, data) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/vi/review/${id}`, data)
        console.log(response)
        dispatch({
            type: UPDATE_USER_REVIEW,
            payload: response,
        })


    }

    catch (err) {
        dispatch({
            type: UPDATE_USER_REVIEW,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}
