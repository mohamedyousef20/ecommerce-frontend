import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, Typography, IconButton, Menu, MenuItem,
    InputAdornment, TextField, TableSortLabel, CircularProgress,
    Button
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../../../redux/action/productAction';
import WarningModal from '../../Utils/WarningModal';
import AdminDeleteProdHook from '../../../customHooks/Admin/AdminDeleteProdHook';
import AdminGetAllProd from '../../../customHooks/Admin/AdminGetAllProd';

const Products = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const [
        productIdToDelete,
        setProductIdToDelete,
        isModalOpen,
        setIsModalOpen,
        handleConfirmDelete,
        handleOpenModal,
        handleCancelDelete
    ] = AdminDeleteProdHook();

    const [products] = AdminGetAllProd();

    console.log('Products:', products); // Debugging: Check the structure of products

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    // Filter and sort logic
    const filteredRows =
        products && products.data
            ? products.data
                .filter((row) =>
                    Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
                )
                .sort((a, b) =>
                    order === 'asc'
                        ? a[orderBy] < b[orderBy] ? -1 : 1
                        : a[orderBy] > b[orderBy] ? -1 : 1
                )
            : [];

    // Loading state
    if (!products || !products.data) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Products
                    </Typography>
                    <Button
                        sx={{ m: 1 }}

                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/dashboard/order/create"
                        startIcon={<Add />}
                    >
                        Add New Product
                    </Button>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'name'}
                                            direction={orderBy === 'name' ? order : 'asc'}
                                            onClick={() => handleRequestSort('name')}
                                        >
                                            Name
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.length > 0 ? (
                                    filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((product) => (
                                            <TableRow hover key={product._id}>
                                                <TableCell>
                                                    <img
                                                        src={product.imageCover}
                                                        alt={product.name}
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            borderRadius: '10px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.category?.name || 'N/A'}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={(event) => handleMenuOpen(event, product)}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No products found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </Box>
            </Paper>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem component={Link} to={`/dashboard/product/update/${selectedRow?._id}`}>
                    <Edit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => {
                    setProductIdToDelete(selectedRow?._id);
                    setIsModalOpen(true);
                }} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsModalOpen(false)}
                message="Are you sure you want to delete this product?"
            />
        </Box>
    );
};

export default Products;