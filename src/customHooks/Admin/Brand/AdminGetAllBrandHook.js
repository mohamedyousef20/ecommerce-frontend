
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { deleteBrand, getAllBrand } from '../../../redux/action/brandAction';

const AdminGetAllBrandHook = () => {


    const [selectedBrand, setSelectedBrand] = useState([]);
    const [open, setOpen] = useState(false);
    const [brandIdToDelete, setBrandIdToDelete] = useState(null);


    // Handle row selection/deselection
    const handleSelectBrand = (id) => {
        setSelectedBrand((prev) => {
            if (prev.includes(id)) {
                return prev.filter((brandId) => brandId !== id);
            }
            return [...prev, id];
        });
    };


    // Modal Handlers
    const handleOpenModal = (id) => {
        setBrandIdToDelete(id);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setBrandIdToDelete(null);
    };

    const handleDelete = async () => {


        await dispatch(deleteBrand(brandIdToDelete))

        handleCloseModal();

        window.location.reload(true)
    };
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllBrand())
    }, [])

    const brand = useSelector((state) => state.brandReducer.allBrand)

    return [
        selectedBrand,
        setSelectedBrand,
        open,
        setOpen,
        brandIdToDelete,
        setBrandIdToDelete,
        handleSelectBrand,
        handleOpenModal,
        handleCloseModal,
        handleDelete,
        brand



    ]
}

export default AdminGetAllBrandHook
