import { useEffect, useState } from 'react'
import { getAllCategory, getAllCategoryWithPagination } from '../../redux/action/categoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
const AdminGetAllCategoryHook = () => {

    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []
    )
    // get last category from redux
    const category = useSelector(state => state.categoryReducer.allCategory);
    // get last loading from redux

    let paginationResult = 0;
    try {
        if (category.paginationResult) { paginationResult = category.paginationResult };


    } catch (err) { }


    const onPageChange = (paginationResult) => {
        setLoading(true)
        dispatch(getAllCategoryWithPagination(paginationResult))
        setLoading(false)
    }
    return [category, loading, onPageChange, paginationResult];
}

export default AdminGetAllCategoryHook
