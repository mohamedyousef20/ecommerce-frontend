import React, { useState } from 'react'
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
    IconButton,
    TableBody,
    TableCell,
    TableRow,
    Button,
    TableContainer,
    Modal,
    Box,
    Typography,


} from "@mui/material";


import { Link } from 'react-router-dom';
import AdminDeleteProdHook from '../../../customHooks/Admin/AdminDeleteProdHook';



const ProductTableBody = ({ item }) => {
    const [productIdToDelete, setProductIdToDelete, open, setOpen, handleDelete, handleOpenModal, handleCloseModal] = AdminDeleteProdHook();

    return (
        <TableBody>
            {item ? item.map((product, index) => (
                <TableRow key={product._id}>
                    <TableCell>
                        <img src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    {/* <TableCell>{product._id}</TableCell> */}
                    <TableCell>{product.desc}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    {/* <TableCell>'ff'</TableCell> */}
                    {/* <TableCell>{product.subcategory}</TableCell> */}
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                        <IconButton sx={{ color: 'black' }}>
                            <Visibility sx={{ color: 'black' }} />
                        </IconButton>
                        <Link to={`/admin/update-product/${item[index]._id}`}>
                            <IconButton sx={{ color: 'blue' }}>
                                <Edit sx={{ color: 'blue' }} />
                            </IconButton>

                        </Link>
                        <IconButton sx={{ color: 'red' }} >
                            <Delete sx={{ color: 'red' }} key={product._id} onClick={() => handleOpenModal(product._id)} />
                        </IconButton>
                    </TableCell>

                </TableRow>
            )) : <h1>No products</h1>}


            {/* /////////// modal warning //////////////////////////////////////// */}


            <Modal
                open={open}
                // onClose={onClose}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 18,
                        p: 4,
                        outline: 'none'
                    }}
                >
                    <Typography id="delete-modal-title" variant="h6" component="h2">
                       are you ure
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            onClick={handleDelete}
                            sx={{
                                fontWeight: 600,
                                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                '&:hover': {
                                    backgroundColor: '#ff0000',
                                    color: '#fff',
                                },
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleCloseModal}
                            sx={{
                                fontWeight: 600,
                                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                color: '#',
                                '&:hover': {
                                    backgroundColor: 'green',
                                    color: '#fff',

                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </TableBody>
    )
}

export default ProductTableBody
