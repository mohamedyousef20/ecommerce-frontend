
import React from 'react';
import {
    Button,
    Paper,
    Stack,
    Table,
    TableContainer,
    Modal,
    Box,
    Typography,


} from "@mui/material";
import AdminGetAllProd from "../../../customHooks/Admin/AdminGetAllProd";
import ProductTableHead from './modal';
import ProductTableBody from './ProductTableBody';
import AdminDeleteProdHook from '../../../customHooks/Admin/AdminDeleteProdHook';
import { Add } from '@mui/icons-material';
import ProductTableButton from './ProductTableButton';




const ProductTableContainer = () => {
    const [item] = AdminGetAllProd();




    // const handleView = (id) => {
    //     console.log('View product', id);
    // };

    return (
        <>

            <ProductTableButton />
            <TableContainer component={Paper}>
                <Table>
                    <ProductTableHead />
                    <ProductTableBody item={item} />
                </Table>
            </TableContainer>

       
        </>
    );
};

export default ProductTableContainer;


