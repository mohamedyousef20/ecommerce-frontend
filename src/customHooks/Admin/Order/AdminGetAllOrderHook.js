import React, { useEffect, useState } from 'react'
import { getAllOrders } from '../../../redux/action/orderAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AdminGetAllOrderHook = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({ page: 1, limit: 5, keyword: '', sort: '', fields: '' });

    // Fetching orders (simulating a data fetch)
    useEffect(() => {
        dispatch(getAllOrders(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ))
    }, [filters, dispatch]);

    const allOrders = useSelector((state) => state.orderReducer.allOrder);
    let paginationResult = allOrders?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };

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

    return [orders, paginationResult, onPageChange, onSearch, onSort];

}

export default AdminGetAllOrderHook
