import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct } from "../../redux/action/productAction";

const AdminGetAllProd = () => {


    const dispatch = useDispatch();
    const [filters, setFilters] = useState({ page: 1, limit: 5, keyword: '', sort: '', fields: '' });

    useEffect(() => {

        dispatch(getAllProduct(filters.page, filters.limit, filters.keyword, filters.sort, filters.fields));

    }, [filters,dispatch])

    const allProduct = useSelector((state) => state.productReducer.allProduct || []);
    // if error occur just make products = []
    let paginationResult = allProduct?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };
    let products = [];
    try {
        if (allProduct) {
            products = allProduct;


        }
        else {
            products = [];
        }
    } catch (e) {
        // console.log(e)
    }
    return [products, paginationResult, onPageChange, onSearch, onSort, setFilters];




}

export default AdminGetAllProd
