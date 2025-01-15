import { useInsertData } from "../../Hooks/useInsertData";
import { CREATE_ORDER_CASH } from "../type";

//create order cash fro user
export const createOrderCash = (cartId, body) => async (dispatch) => {
    console.log('object', cartId)
    try {
        const response = await useInsertData(`/api/vi/order/${cartId}`, body);
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