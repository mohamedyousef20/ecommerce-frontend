import React, { useEffect } from 'react'
import { getAllOrders } from '../../../redux/action/orderAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AdminGetAllOrderHook = () => {
    const dispatch = useDispatch()

    // Fetching orders (simulating a data fetch)
    useEffect(() => {
        dispatch(getAllOrders())
    }, []);

    const allOrders = useSelector((state) => state.orderReducer.allOrder);


    let orders = [];
    try {
        if (allOrders) {
            orders = allOrders;
        }
        else {
            orders = [];
        }
    } catch (e) {
        // console.log(e)
    }

    return [orders];

}

export default AdminGetAllOrderHook
