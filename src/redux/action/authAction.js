
// import { useGetDataToken, useGetData } from "../../Hooks/useGetData";
// import useDeleteData from "../../Hooks/useDeleteData";
import { useGetDataToken } from "../../Hooks/useGetData";
import { InsertData, useInsertDataWithImage } from "../../Hooks/useInsertData";

import {
    LOGIN_USER,
    GET_ERROR,
    REGISTER_USER,
    FORGET_PASSWORD,
    RESET_PASSWORD,
    VERIFY_RESET_PASSWORD_CODE,
    GET_Logged_USER_DATA
} from "../type";



// // ------------------------ register user action------------------------------
export const registerUser = (data) => async (dispatch) => {

    try {
        const response = await InsertData(`/api/vi/auth/register`, data);
        dispatch({
            type: REGISTER_USER,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        })
    }
}



// ------------------------ login user action------------------------------
export const loginUser = (data) => async (dispatch) => {

    console.log(data)
    try {
        const response = await InsertData("/api/vi/auth/login", data);
        console.log(response)
        dispatch({
            type: LOGIN_USER,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: LOGIN_USER,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}



// ------------------------ send Password ResetCode action------------------------------
export const sendPasswordResetCode = (data) => async (dispatch) => {


    try {
        const response = await InsertData("/api/vi/auth/forgetPassword", data);
        console.log(response)
        dispatch({
            type: FORGET_PASSWORD,
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




// ------------------------ Rest Password and Update Password action------------------------------
export const verifyResetCode = (data) => async (dispatch) => {


    try {
        const response = await InsertData("/api/vi/auth/verifyResetCode", data);
        console.log(response)
        dispatch({
            type: VERIFY_RESET_PASSWORD_CODE,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: VERIFY_RESET_PASSWORD_CODE,
            payload: err.response,
        })
    }
}


// ------------------------ Reset Password  action------------------------------
export const resetPassword = (data) => async (dispatch) => {


    try {
        const response = await InsertData("/api/vi/auth/resetPassword", data);
        console.log(response)
        dispatch({
            type: RESET_PASSWORD,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: RESET_PASSWORD,
            payload: err.response,
        })
    }
}













