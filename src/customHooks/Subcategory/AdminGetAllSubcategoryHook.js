import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllSubCategory } from '../../redux/action/subCategoryAction';
const AdminGetAllSubcategoryHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const getSubCate = async () => {
            await dispatch(getAllSubCategory());

        };
        getSubCate();
    }, []
    )
    // get last category from redux
    const allSubCategory = useSelector(state => state.subcategoryReducer.allSubcategory);
    // get last loading from redux
    const loading = useSelector(state => state.subcategoryReducer.loading);
    let subcategory = [];

    try {
        if (allSubCategory.data) {
            console.log(allSubCategory)
            console.log(allSubCategory.data)
            subcategory = allSubCategory.data;

        }
        else {
            subcategory = [];
        }
    } catch (error) { }

    return [subcategory];
}
export default AdminGetAllSubcategoryHook
