
import { useGetData } from "../../Hooks/useGetData";
import useDeleteData from "../../Hooks/useDeleteData";
import { useInsertDataWithImage } from "../../Hooks/useInsertData"
import {
    CREATE_PRODUCT,
    GET_ALL_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCT_USER_LIKE,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_ALL_PRODUCT_IN_CATEGORY,
    GET_MOST_POPULAR_PRODUCT,
    GET_MOST_OFFERED_PRODUCT,
    GET_ALL_PRODUCT_SEARCH,
    GET_ERROR
} from "../type"
import { useUpdateDataWithImage } from "../../Hooks/useUpdateData";

// ------------------------ create product action------------------------------
export const createProduct = (formatData) => async (dispatch) => {

    try {
        const response = await useInsertDataWithImage("/api/vi/product", formatData);
        console.log('im is the res', response)
        dispatch({
            type: CREATE_PRODUCT,
            payload: response,
            loading: true
        })
    }

    catch (err) {

        dispatch({
            type: CREATE_PRODUCT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
            loading: false
        })
    }
}

// ------------------------ get all product action------------------------------
export const getAllProduct = () => async (dispatch) => {


    try {
        const response = await useGetData("/api/vi/product");
        dispatch({
            type: GET_ALL_PRODUCT,
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


// ------------------------ get one product action------------------------------
export const getOneProduct = (id) => async (dispatch) => {



    try {
        const response = await useGetData(`/api/vi/product/${id}`);
        console.log(response)
        dispatch({
            type: GET_PRODUCT,
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


// ------------------------ get Product User Like------------------------------
export const getProductUserLike = (id) => async (dispatch) => {



    try {
        const response = await useGetData(`/api/vi/product?category=${id}`);
        dispatch({
            type: GET_PRODUCT_USER_LIKE,
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


// ------------------------ Delete Product ------------------------------
export const deleteProduct = (id) => async (dispatch) => {



    try {
        const response = await useDeleteData(`/api/vi/product/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
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


// ------------------------ Update Product ------------------------------
export const updateProduct = (id, formData) => async (dispatch) => {
console.log('///////////////////',id)

    try {
        const response = await useUpdateDataWithImage(`/api/vi/product/${id}`, formData);
        console.log('the response', response)
        dispatch({
            type: UPDATE_PRODUCT,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}


// get all product for category action
export const getAllProductInCate = (id) => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/category/${id}/product`)
        dispatch({
            type: GET_ALL_PRODUCT_IN_CATEGORY,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_ALL_PRODUCT_IN_CATEGORY,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}




// get all product for category action
export const getMostPopularProduct = () => async (dispatch) => {

    try {
        const response = await useGetData(`/api/vi/product?limit=4&sort=-sold`)
        dispatch({
            type: GET_MOST_POPULAR_PRODUCT,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_MOST_POPULAR_PRODUCT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

// get all product for category action
export const getMostOfferedProduct = () => async (dispatch) => {

    try {
        const response = await useGetData(`api/vi/product?limit=4&sort=-priceAfterDiscount`)
        dispatch({
            type: GET_MOST_OFFERED_PRODUCT,
            payload: response,
        })
    }

    catch (err) {
        dispatch({
            type: GET_MOST_OFFERED_PRODUCT,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }
}

//get all products with query string
export const getAllProductSearch = (queryString) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/vi/product?${queryString}`);
        console.log('data ', response)
        dispatch({
            type: GET_ALL_PRODUCT_SEARCH,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}
