import { useEffect, useState } from 'react';
import { getAllCategoryWithPagination } from '../../redux/action/categoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AdminGetAllCategoryHook = () => {
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ page: 1, limit: 5, keyword: '', sort: '', fields: '' });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoryWithPagination(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ));
    }, [filters, dispatch]);

    const category = useSelector((state) => state.categoryReducer.allCategory);
    let paginationResult = category?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };

    return [category, loading, onPageChange, paginationResult, onSearch, onSort, setFilters];
};

export default AdminGetAllCategoryHook;
