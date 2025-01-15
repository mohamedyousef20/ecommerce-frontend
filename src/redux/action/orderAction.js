import { useGetDataToken } from '../../Hooks/useGetData';
import {
     GET_ALL_ORDER,
     GET_ONE_ORDER,
    //  GET_ONE_ORDER, 
    //  UPDATE_ORDER_PAY 
    } from '../type'


export const getAllOrders = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/vi/order`);
        dispatch({
            type: GET_ALL_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_ORDER,
            payload: e.response,
        })
    }
}

export const getOneOrders = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/vi/orders/${id}`);

        dispatch({
            type: GET_ONE_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_ORDER,
            payload: e.response,
        })
    }
}
