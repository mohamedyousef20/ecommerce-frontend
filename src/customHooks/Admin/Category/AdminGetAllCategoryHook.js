import React, { useState } from 'react';
import { useDispatch } from 'react-redux/lib/exports';
import { deleteCategory } from '../../../redux/action/categoryAction';
import AllCatePageHook from '../../../customHooks/Category/AllCatePageHook';

const AdminGetAllCategoryHook = () => {


    const dispatch = useDispatch()

    const [categories, loading] = AllCatePageHook();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    console.log('cat',categories)
    // Handle row selection/deselection
    const handleSelectCategory = (id) => {
        setSelectedCategories((prev) => {
            if (prev.includes(id)) {
                return prev.filter((categoryId) => categoryId !== id);
            }
            return [...prev, id];
        });
    };


    // Modal Handlers
    const handleOpenModal = (id) => {
        setCategoryIdToDelete(id);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleDelete = async () => {


        await dispatch(deleteCategory(categoryIdToDelete))

        handleCloseModal();

        window.location.reload(true)
    };
    return [
        categories,
        loading,
        selectedCategories,
        setSelectedCategories,
        open,
        setOpen,
        categoryIdToDelete,
        setCategoryIdToDelete,
        handleSelectCategory,
        handleOpenModal,
        handleCloseModal,
        handleDelete

    ]
}

export default AdminGetAllCategoryHook
