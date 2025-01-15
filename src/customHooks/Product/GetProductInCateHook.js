import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct, getAllProductInCate } from "../../redux/action/productAction";
import { useParams } from "react-router-dom";

const GetProductInCateHook = () => {


    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {

        dispatch(getAllProductInCate(id));

    }, [])

    const allProduct = useSelector((state) => state.allProduct.allProductInCate);

    let products = [];
    if (allProduct.data) {

        products = allProduct.data;


    }
    else {
        products = [];
    }
    return [products];
}

export default GetProductInCateHook
