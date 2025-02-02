
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { deleteBrand, getAllBrand } from '../../../redux/action/brandAction';

const AdminGetAllBrandHook = () => {


    const [loading, setLoading] = useState(true)

    const [filters, setFilters] = useState({ page: 1, keyword: '', sort: '', fields: '' });


    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        dispatch(getAllBrand(filters.page, filters.limit, filters.keyword, filters.sort, filters.fields))
        setLoading(false)
    }, [filters, dispatch])

    const allBrands = useSelector((state) => state.brandReducer.allBrand)
    let paginationResult = allBrands?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };

    let brands = [];
    try {
        if (allBrands) {
            brands = allBrands;
        }
        else {
            brands = [];
        }
    } catch (e) {
        // console.log(e)
    }

    return [brands, paginationResult, onPageChange, onSearch, onSort, setFilters]
}

export default AdminGetAllBrandHook
