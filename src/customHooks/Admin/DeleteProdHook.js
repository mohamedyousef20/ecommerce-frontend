

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { deleteProduct, getAllProduct } from "../../redux/action/productAction";

const DeleteProdHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(deleteProduct(id));

    }, [])

    const deleteOne = useSelector((state) => state.productReducer.deleteProduct);
    // console.log(deleteOne)
    let products = [];
    if (deleteOne.data) {
        products = deleteOne.data;


    }
    else {
        products = [];
    }
    // console.log(products)
    return [products];

}


export default DeleteProdHook
