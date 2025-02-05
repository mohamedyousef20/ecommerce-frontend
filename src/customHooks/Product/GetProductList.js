import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllProduct } from "../../redux/action/productAction";

const GetProductList = () => {
    const dispatch = useDispatch();

    // State for filters
    const [filters, setFilters] = useState({
        page: 1,
        limit: '',
        keyword: '',
        sort: '',
        fields: '',
        category: '',
        brand: '',
        priceRange: [0, 1000], // Default price range
    });

    // Fetch products when filters change
    useEffect(() => {
        dispatch(getAllProduct(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields,
            filters.category,
            filters.brand,
            filters.priceRange
        ));
    }, [filters, dispatch]);

    // Get products from Redux store
    const allProduct = useSelector((state) => state.productReducer.allProduct);
    let paginationResult = allProduct?.paginationResult || {};
    console.log('allProduct', allProduct);

    // Handle page change
    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    // Handle search
    const onSearch = (keyword) => {
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    // Handle sort
    const onSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort }));
    };

    // Handle category filter
    const onCategoryChange = (category) => {
        setFilters((prev) => ({ ...prev, category, page: 1 }));
    };

    // Handle brand filter
    const onBrandChange = (brand) => {
        setFilters((prev) => ({ ...prev, brand, page: 1 }));
    };

    // Handle price range filter
    const onPriceRangeChange = (priceRange) => {
        setFilters((prev) => ({ ...prev, priceRange, page: 1 }));
    };

    // Extract products from the response
    let products = [];
    try {
        if (allProduct.data) {
            products = allProduct.data;
        } else {
            products = [];
        }
    } catch (error) {
        console.error("Error parsing products:", error);
    }

    return [
        products,
        paginationResult,
        onPageChange,
        onSearch,
        onSort,
        onCategoryChange,
        onBrandChange,
        onPriceRangeChange,
        filters, 
    ];
};

export default GetProductList;