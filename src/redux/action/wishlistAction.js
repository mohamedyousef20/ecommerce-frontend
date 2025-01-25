import useDeleteData from "../../Hooks/useDeleteData"
import { useGetDataToken } from "../../Hooks/useGetData"
import { InsertData } from "../../Hooks/useInsertData"
import { useUpdateData } from "../../Hooks/useUpdateData"
import {
    Add_Product_TO_WISH_LIST,
    DELETE_PRODUCT_FROM_WISHLIST,
    GET_ALL_PRODUCT_IN_WHISH_LIST
} from "../type"


// add Product TO WishList action
export const addProductTOWishList = (productId) => async (dispatch) => {
    console.log("productId", productId)
    try {
        const response = await InsertData('/api/vi/wishlist', productId)
        console.log("THE RESPONSE", response)
        dispatch({
            type: Add_Product_TO_WISH_LIST,
            payload: response,
        })
    }
    catch (err) {
        dispatch({
            type: Add_Product_TO_WISH_LIST,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

// delete Product from WishList action
export const updateProductWishListStatus = (productId) => async (dispatch) => {
    console.log('object', productId)
    try {
        const response = await useUpdateData('/api/vi/wishlist', productId)
        console.log("THE RESPONSE", response)
        dispatch({
            type: DELETE_PRODUCT_FROM_WISHLIST,
            payload: response,
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_PRODUCT_FROM_WISHLIST,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// // delete Product from WishList action
// export const deleteProductFromWishList = (productId) => async (dispatch) => {
//     try {
//         const response = await useDeleteData('/api/vi/wishlist', productId)
//         console.log("THE RESPONSE", response)
//         dispatch({
//             type: DELETE_PRODUCT_FROM_WISHLIST,
//             payload: response,
//         })
//     }
//     catch (err) {
//         dispatch({
//             type: DELETE_PRODUCT_FROM_WISHLIST,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }


// add Product TO WishList action
export const getAllProductInWishList = () => async (dispatch) => {

    try {
        const response = await useGetDataToken('/api/vi/wishlist')

        dispatch({
            type: GET_ALL_PRODUCT_IN_WHISH_LIST,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ALL_PRODUCT_IN_WHISH_LIST,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

