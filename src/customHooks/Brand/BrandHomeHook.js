import { useEffect } from 'react'
import { getAllCategory } from '../../redux/action/categoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllBrand } from '../../redux/action/brandAction';

const BrandHomeHook = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrand());
    }, []
    )

    const brand = useSelector(state => state.brandReducer.allBrand);
    const loading = useSelector(state => state.brandReducer.loading);


    return [loading, brand];

}

export default BrandHomeHook
