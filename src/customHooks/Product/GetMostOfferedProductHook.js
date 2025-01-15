import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct, getMostOfferedProduct, getMostPopularProduct } from "../../redux/action/productAction";

const GetMostOfferedProductHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMostOfferedProduct());

    }, [])

    const allProduct = useSelector((state) => state.allProduct.mostOfferedProduct);

    let mostOfferedProduct = [];
    try {
        if (allProduct.data)
            mostOfferedProduct = allProduct.data;
        else
            mostOfferedProduct = []
    } catch (e) { }

    return [mostOfferedProduct];

}

export default GetMostOfferedProductHook;
