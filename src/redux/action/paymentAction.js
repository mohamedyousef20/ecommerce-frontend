import { useGetData, useGetDataToken } from "../../Hooks/useGetData";
import { InsertData } from "../../Hooks/useInsertData";
import { CREATE_ORDER_CASH, CREATE_ORDER_CARD } from "../type";

//create order cash fro user
export const createOrderCash = (cartId, body) => async (dispatch) => {
    console.log('object', cartId)
    try {
        const response = await InsertData(`/api/vi/order/${cartId}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: e.response,
        })
    }
}



//create order cash fro user
export const createOrderCard = (cartId, body) => async (dispatch) => {
    console.log('object', cartId)
    try {
        const response = await useGetDataToken(`/api/vi/order/check-out-session/${cartId}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: e.response,
        })
    }
}