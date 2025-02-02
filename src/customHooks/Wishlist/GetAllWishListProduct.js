import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllProductInWishList } from '../../redux/action/wishlistAction';

const GetAllWishListProduct = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ page: 1, limit: '', keyword: '', sort: '', fields: '' });

    // Fetch wishlist products on component mount]



    useEffect(() => {
        dispatch(getAllProductInWishList(filters.page, 
            filters.limit, 
            filters.keyword, 
            filters.sort,
             filters.fields))
             .then(() => setIsLoading(false));

    }, [dispatch]);

    const prodInWishlist = useSelector((state) => state.wishListReducer.allProductInWishList);
    let paginationResult = prodInWishlist?.paginationResult || {};

    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };


    return [prodInWishlist, isLoading, setIsLoading, paginationResult, onPageChange]
}

export default GetAllWishListProduct
