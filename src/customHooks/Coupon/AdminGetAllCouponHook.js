import React, { useEffect } from 'react'
import { getAllCoupon } from '../../redux/action/couponAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AdminGetAllCouponHook = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllCoupon());
    }, [dispatch]);


    const allCoupons = useSelector((state) => state.couponReducer.getAllCoupon);

    let coupons = [];
    try {
        if (allCoupons) {
            coupons = allCoupons;
        }
        else {
            coupons = [];
        }
    } catch (e) {
        console.log(e)
    }

    return [coupons];
}

export default AdminGetAllCouponHook
