import React, { useEffect, useState } from "react";
import { getAllProductSearch } from "../../redux/action/productAction";
import { useDispatch, useSelector } from "react-redux/lib/exports";

const GetProductSearchHook = () => {
    const dispatch = useDispatch();
    const [searchWord, setSearchWord] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [priceRange, setPriceRange] = useState([0, 2000]); // Adjust max price as needed

    console.log(sortOption)
    console.log(searchWord)


    const handleSearch = (event) => {
        setSearchWord(event.target.value);

        const path = window.location.pathname;
        if (path !== "/product") {
            window.location.href = "/product";
        }
    };

    useEffect(() => {
        let query = `keyword=${searchWord}`;
        if (sortOption) {
            query += `&sort=${sortOption}`;
        }
        if (category) {
            query += `&category=${category}`;
        }

        if (brand) {
            query += `&brand=${brand}`;
        }

        if (priceRange) {
            query += `&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;
        }


        dispatch(getAllProductSearch(query));

    }, [searchWord, sortOption,category,brand,priceRange, dispatch]);

    const searchedProduct = useSelector((state) => state.allProduct.allProductSearch);
    let searchedProducts = [];

    try {
        searchedProducts = searchedProduct?.data || [];
    } catch (error) {
        searchedProducts = [];
    }

    console.log("Data received:", searchedProducts);

    return [
        sortOption,
        setSortOption,
        category,
        setCategory,
        brand,
        setPriceRange,
        priceRange,
        setBrand,
        handleSearch,
        searchedProducts
    ];
};

export default GetProductSearchHook;
