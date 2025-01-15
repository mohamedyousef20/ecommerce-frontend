

import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData, useGetDataToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData"
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
    Add_Product_TO_CART, GET_ERROR, DELETE_PRODUCT_FROM_CART,
    GET_USER_CART,
    UPDATE_PRODUCT_IN_CART,
    APPLY_COUPON_TO_CART
} from "../type";



// // Add Product To Cart Action
export const AddProductToCart = (body) =>async (dispatch) => {


    try {
        const response = await useInsertData(`/api/vi/cart`, body);
        console.log(response)
        dispatch({
            type: Add_Product_TO_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
        })
    }
}


// get user cart
export const getUserCart = () => async (dispatch) => {

    try {
        const response = await useGetDataToken(`/api/vi/cart`);
        dispatch({
            type: GET_USER_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_USER_CART,
            payload: e.response,
        })
    }
}




// delete product from user cart
export const removeProductFromCart = (itemId) => async (dispatch) => {

    console.log('cart action')
    try {
        const response = await useDeleteData(`/api/vi/cart/${itemId}`);
        console.log("response", response);
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            payload: e.response,
        })
    }
}


// update  product quantity from user cart
export const updateProductQuantity = (itemId, data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/cart/${itemId}`, data);
        console.log(response)
        dispatch({
            type: UPDATE_PRODUCT_IN_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: UPDATE_PRODUCT_IN_CART,
            payload: e.response,
        })
    }
}

// update  product quantity from user cart
export const applyCouponToCart = (data) => async (dispatch) => {

    try {
        const response = await useUpdateData(`/api/vi/cart/coupons/applyCoupon`, data);
        console.log(response)
        dispatch({
            type: APPLY_COUPON_TO_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: APPLY_COUPON_TO_CART,
            payload: e.response,
        })
    }
}


