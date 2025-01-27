import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct } from "../../redux/action/productAction";

const GetProductList = () => {


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllProduct());

    }, [])

    const allProduct = useSelector((state) => state.productReducer.allProduct);

    let products = [];
    try {
        if (allProduct.data) {

            products = allProduct.data;


        }
        else {
            products = [];
        }
    } catch (error) { }

    return [products];
}

export default GetProductList
