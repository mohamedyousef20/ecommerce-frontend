
import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData, useGetDataToken } from "../../Hooks/useGetData";
import { InsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";

import { GET_ALL_COUPON, CREATE_COUPON, GET_ERROR, UPDATE_COUPON, GET_COUPON, DELETE_COUPON } from "../type";

// get all coupons action
export const getAllCoupon = () => async (dispatch) => {

    try {
        const response = await useGetData('/api/vi/coupon')

        dispatch({
            type: GET_ALL_COUPON,
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


// create coupon  coupon action
export const createCoupon = (data) => async (dispatch) => {

    try {
        const response = await InsertData('/api/vi/coupon', data)

        dispatch({
            type: CREATE_COUPON,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: CREATE_COUPON,
            payload: err.response,
        })
    }
}



// get on  coupon action
export const getOneCoupon = (id) => async (dispatch) => {
    console.log(id)

    try {
        const response = await useGetDataToken(`/api/vi/coupon/${id}`)
        dispatch({
            type: GET_COUPON,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_COUPON,
            payload: err.response,
        })
    }
}

// update coupon action
export const updateCoupon = (id, data) => async (dispatch) => {

    try {
        const response = await useUpdateData(`/api/vi/coupon/${id}`, data)
        dispatch({
            type: UPDATE_COUPON,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_COUPON,
            payload: err.response,
        })
    }
}




// delete coupon action
export const deleteCoupon = (id) => async (dispatch) => {

    try {
        const response = await useDeleteData(`/api/vi/coupon/${id}`)
        dispatch({
            type: DELETE_COUPON,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_COUPON,
            payload: err.response,
        })
    }
}
