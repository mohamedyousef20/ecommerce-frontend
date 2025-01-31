import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import Notification from '../../useNotification';
import { updateOrderPay } from '../../../redux/action/orderAction';

const AdminUpdateOrderPayment = (id) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const res = useSelector((state) => state.orderReducer.updateOrderPaymentMethod);

    const handleUpdatePayment = (id) => {
        setLoading(true)
        dispatch(updateOrderPay(id));
        setLoading(false)

    };

    useEffect(() => {
        if (res && res.data ) {
            // console.log('============',res.data)
            if (res) {
                Notification('Order is paid successfully', 'success')
            }
        }
    }, [res.data])

    return [handleUpdatePayment, loading]
}

export default AdminUpdateOrderPayment
