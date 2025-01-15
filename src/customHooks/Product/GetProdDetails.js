import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getOneProduct, getProductUserLike } from "../../redux/action/productAction";

const GetProdDetails = (id) => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneProduct(id))

    }, []);




    const oneProduct = useSelector((state) => state.allProduct.oneProduct);
console.log(oneProduct)
    let item = [];

    if (oneProduct) {
        item = oneProduct;
    }
    else {
        item = [];

    }
console.log(item)
if(item){
    console.log(item.category)

}


    // useEffect(() => {
    //     dispatch(getProductUserLike(item.category._id))

    // }, []);


console.log(item)
    return [item];

}

export default GetProdDetails
