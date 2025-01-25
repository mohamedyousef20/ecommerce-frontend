import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllProduct } from "../../redux/action/productAction";

const AdminGetAllProd = () => {


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllProduct());

    }, [dispatch])

    const allProduct = useSelector((state) => state.allProduct.allProduct);
// if error occur just make products = []

    let products = [];
    try{
    if (allProduct) {
        products = allProduct;


    }
    else {
        products = [];
    }
}catch(e){
    console.log(e)
}
    return [products];




}

export default AdminGetAllProd
