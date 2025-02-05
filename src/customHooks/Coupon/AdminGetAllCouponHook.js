import React, { useEffect, useState } from 'react'
import { getAllCoupon } from '../../redux/action/couponAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AdminGetAllCouponHook = () => {

    const dispatch = useDispatch();
    const [filters, setFilters] = useState({ page: 1, limit:8, keyword: '', sort: '', fields: '' });
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        setLoading(true)
        dispatch(getAllCoupon(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ));
        setLoading(false)
    }, [filters,dispatch]);


    const allCoupons = useSelector((state) => state.couponReducer.getAllCoupon);
    let paginationResult = allCoupons?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };

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
    return [coupons, loading, onPageChange, paginationResult, onSearch, onSort, setFilters];
}

export default AdminGetAllCouponHook
