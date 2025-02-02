import useDeleteData from '../../Hooks/useDeleteData';
import { useGetDataToken } from '../../Hooks/useGetData';
import { useUpdateData } from '../../Hooks/useUpdateData';
import {
    GET_ALL_ORDER,
    GET_ONE_ORDER,
    UPDATE_ORDER_PAY,
    UPDATE_ORDER_PAYMENT_METHOD,
    UPDATE_ORDER_DELIVER,
    DELETE_ORDER,
    CANCEL_ORDER,
    ACTIVE_ORDER
} from '../type'


export const getAllOrders = (page = 1, limit = '', keyword = '', sort = '', fields = '') => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/vi/order?page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&fields=${fields}`);
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
        const response = await useGetDataToken(`/api/vi/order/${id}`);

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



export const updateOrderPay = (id) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/order/${id}/pay`);
        console.log('ddd', response)
        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: e.response,
        })
    }
}


export const updateOrderPaymentMethod = (data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/order/pay/method`, data);
        console.log('ddd', response)
        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: e.response,
        })
    }
};
    export const updateOrderDeliver = (id) => async (dispatch) => {
        try {
            const response = await useUpdateData(`/api/vi/order/${id}/deliver`);

            dispatch({
                type: UPDATE_ORDER_DELIVER,
                payload: response,
            })

        } catch (e) {
            dispatch({
                type: UPDATE_ORDER_DELIVER,
                payload: e.response,
            })
        }
    }


export const deleteOrder = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/vi/order/${id}`);

        dispatch({
            type: DELETE_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_ORDER,
            payload: e.response,
        })
    }
}

export const cancelOrder = (id) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/order/cancel`,id);

        dispatch({
            type: CANCEL_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CANCEL_ORDER,
            payload: e.response,
        })
    }
}



export const activeOrder = (id) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/vi/order/active`, id);

        dispatch({
            type: ACTIVE_ORDER,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ACTIVE_ORDER,
            payload: e.response,
        })
    }
}