import { useEffect } from 'react'
import { getAllCategory, getAllCategoryWithPagination } from '../../redux/action/categoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
const AdminGetAllCategoryHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []
    )
    // get last category from redux
    const category = useSelector(state => state.categoryReducer.allCategory);
    // get last loading from redux
    const loading = useSelector(state => state.categoryReducer.loading);

    let page = 0;
    try {
        if (category.paginationResult) { page = category.paginationResult };


    } catch (err) { }


    const pagination = (page) => {
        dispatch(getAllCategoryWithPagination(page))
    }
    return [category, loading, pagination, page];
}

export default AdminGetAllCategoryHook
