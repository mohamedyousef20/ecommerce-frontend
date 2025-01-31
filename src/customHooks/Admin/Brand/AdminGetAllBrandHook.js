
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { deleteBrand, getAllBrand } from '../../../redux/action/brandAction';

const AdminGetAllBrandHook = () => {


const [loading,setLoading] = useState(true)
 


    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        dispatch(getAllBrand())
        setLoading(false)
    }, [])

    const allBrands = useSelector((state) => state.brandReducer.allBrand)

    let brands = [];
    try {
        if (allBrands) {
            brands = allBrands;
        }
        else {
            brands = [];
        }
    } catch (e) {
        // console.log(e)
    }

    return [brands,loading]
}

export default AdminGetAllBrandHook
