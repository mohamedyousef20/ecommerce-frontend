import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct, getMostPopularProduct } from "../../redux/action/productAction";

const GetMostPopularProductHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMostPopularProduct());

    }, [])

    const allProduct = useSelector((state) => state.productReducer.mostPopularProduct);

    let popularProduct = [];
    try {
        if (allProduct.data)
            popularProduct = allProduct.data;
        else
            popularProduct = []
    } catch (e) { }

    return [popularProduct];

}

export default GetMostPopularProductHook
