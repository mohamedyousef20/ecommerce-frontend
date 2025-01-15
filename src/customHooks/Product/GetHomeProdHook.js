import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct } from "../../redux/action/productAction";

const GetHomeProdHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllProduct());

    }, [])

    const allProduct = useSelector((state) => state.allProduct.allProduct);

    let products = [];
    try {
        if (allProduct.data)
            products = allProduct.data;
        else
            products = []
    } catch (e) { }

    return [products];

}

export default GetHomeProdHook
