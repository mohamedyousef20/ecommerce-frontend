
import { useGetData, useGetDataToken } from "../../Hooks/useGetData";
import useDeleteData from "../../Hooks/useDeleteData";
import { InsertData, useInsertDataWithImage } from "../../Hooks/useInsertData"
import {
    GET_ERROR,
    GET_ALL_USER,
    GET_CURRENT_USER,
    CREATE_USER,
    GET_USER,
    UPDATE_USER_PROFILE,
    DEACTIVATE_MY_ACCOUNT,
    CHANGE_MY_PASSWORD,
    DELETE_MY_ACCOUNT,
    DELETE_USER
} from "../type"


import { useUpdateData, useUpdateDataWithImage } from "../../Hooks/useUpdateData";


// // ------------------------ create user action------------------------------
export const createUser = (data) => async (dispatch) => {

    try {
        const response = await InsertData("/api/vi/user", data);
        dispatch({
            type: CREATE_USER,
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
// ------------------------ get all  user action------------------------------
export const getAllUser = (page = 1, limit = '', keyword = '', sort = '', fields = '') => async (dispatch) => {


    try {
        const response = await useGetDataToken(`/api/vi/user?page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&fields=${fields}`);
        console.log(response)
        dispatch({
            type: GET_ALL_USER,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ERROR,
            payload: err.response,
        })
    }
}

// ------------------------ update user profile action------------------------------

export const updateUserProfile = (formData) => async (dispatch) => {

    try {
        const response = await useUpdateDataWithImage(`/api/vi/user/updateUserData`, formData);
        console.log('response', response)
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: err.response,
        })
    }
}



// ------------------------ get logged user  action------------------------------
export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/vi/user/getData/getMe`);
        dispatch({
            type: GET_CURRENT_USER,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_CURRENT_USER,
            payload: e.response,
        })
    }
}



// ------------------------ de active  user account action------------------------------
export const deactivateMyAccount = () => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/user/deactivateMyAccount`);
        dispatch({
            type: DEACTIVATE_MY_ACCOUNT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: DEACTIVATE_MY_ACCOUNT,
            payload: e.response,
        })
    }
}

// ------------------------ de active  user account action------------------------------
export const changeLoggedUserPassword = (data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/user/changeMyPassword`, data);
        dispatch({
            type: CHANGE_MY_PASSWORD,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CHANGE_MY_PASSWORD,
            payload: e.response,
        })
    }
}

// ------------------------ delete my account action------------------------------
export const deleteMyAccount = () => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/vi/user/deleteMyAccount`);
        dispatch({
            type: DELETE_MY_ACCOUNT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: DELETE_MY_ACCOUNT,
            payload: e.response,
        })
    }
}












// // // ------------------------ get one product action------------------------------
// // export const getOneProduct = (id) => async (dispatch) => {



// //     try {
// //         const response = await {useGetData}
// (`/api/vi/product/${id}`);
// //         dispatch({
// //             type: GET_PRODUCT,
// //             payload: response,
// //             loading: true
// //         })
// //     }

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }



// // ------------------------ get Product User Like------------------------------
// export const getProductUserLike = (id) => async (dispatch) => {



// //     try {
// //         const response = await {useGetData}
// (`/api/vi/product?category=${id}`);
// //         dispatch({
// //             type: GET_PRODUCT_USER_LIKE,
// //             payload: response,
// //             loading: true
// //         })
// //     }

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }


// ------------------------ Delete Product ------------------------------
export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/vi/user/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: DELETE_USER,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// // ------------------------ Update Product ------------------------------
// export const updateProduct = (id, formData) => async (dispatch) => {



//     try {
//         const response = await useUpdateDataWithImage(`/api/vi/product/${id}`, formData);
//         dispatch({
//             type: UPDATE_PRODUCT,
//             payload: response,
//             loading: true
//         })
//     }

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }
