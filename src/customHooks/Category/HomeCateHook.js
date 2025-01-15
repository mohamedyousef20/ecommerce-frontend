import { useEffect } from 'react'
import { getAllCategory } from '../../redux/action/categoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
const HomeCateHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []
    )

    const category = useSelector(state => state.categoryReducer.allCategory);
    const loading = useSelector(state => state.categoryReducer.loading);
    return [loading, category];
}

export default HomeCateHook
