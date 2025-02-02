import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllUser } from '../../../redux/action/userAction';

const AdminGetAllUserHook = () => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({ page: 1, limit: 5, keyword: '', sort: '', fields: '' });

    useEffect(() => {
        dispatch(getAllUser(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ));
    }, [filters, dispatch]);

    const allUsers = useSelector((state) => state.userReducer.user);
    let paginationResult = allUsers?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };
    let users = [];
    try {
        if (allUsers) {
            users = allUsers;
        }
        else {
            users = [];
        }
    } catch (e) {
        // console.log(e)
    }

    return [users, paginationResult, onPageChange, onSearch, onSort, setFilters];

}

export default AdminGetAllUserHook
