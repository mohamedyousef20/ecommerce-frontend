import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, Typography, IconButton, Menu, MenuItem,
    InputAdornment, TextField, CircularProgress, Button, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../../../redux/action/productAction';
import WarningModal from '../../Utils/WarningModal';
import AdminDeleteProdHook from '../../../customHooks/Admin/AdminDeleteProdHook';
import AdminGetAllProd from '../../../customHooks/Admin/AdminGetAllProd';
import PaginationTabs from '../../Utils/Pagination';

const Products = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('name'); // Default sort field
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
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

    const [
        products,
        paginationResult,
        onPageChange,
        onSearch,
        onSort,
        setFilters
    ] = AdminGetAllProd();

    // Handle search
    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchQuery(keyword);
        onSearch(keyword); // Update search filter in the hook
    };

    // Handle sort field change
    const handleSortFieldChange = (field) => {
        setSortField(field);
        const sortString = sortOrder === 'asc' ? field : `-${field}`;
        onSort(sortString); // Update sort filter in the hook
    };

    // Handle sort order change
    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        const sortString = order === 'asc' ? sortField : `-${sortField}`;
        onSort(sortString); // Update sort filter in the hook
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage); // Update the state
        setFilters((prevFilters) => ({ ...prevFilters, limit: newRowsPerPage }));
        setPage(0); // Reset to the first page
    };

    // Handle menu open
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    // Handle menu close
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
                    sortOrder === 'asc'
                        ? a[sortField] < b[sortField] ? -1 : 1
                        : a[sortField] > b[sortField] ? -1 : 1
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
                    {/* Add New Product Button and Sort Controls */}
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/dashboard/product/create"
                                startIcon={<Add />}
                            >
                                Add New Product
                            </Button>
                        </Grid>
                        {/* Sort Field Dropdown */}
                        <Grid item>
                            <FormControl sx={{ minWidth: 120, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                <InputLabel sx={{ color: '#333' }}>Sort By</InputLabel>
                                <Select
                                    value={sortField}
                                    onChange={(e) => handleSortFieldChange(e.target.value)}
                                    label="Sort By"
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="price">Price</MenuItem>
                                    <MenuItem value="quantity">Quantity</MenuItem>
                                    <MenuItem value="category">Category</MenuItem>
                                    <MenuItem value="createdAt">Created At</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Sort Order Dropdown */}
                        <Grid item>
                            <FormControl sx={{ minWidth: 120, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                <InputLabel sx={{ color: '#333' }}>Order</InputLabel>
                                <Select
                                    value={sortOrder}
                                    onChange={(e) => handleSortOrderChange(e.target.value)}
                                    label="Order"
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Search Bar */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                    {/* Products Table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
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
                </Box>
                {/* Pagination */}
                <PaginationTabs
                    paginationResult={paginationResult}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Paper>
            {/* Actions Menu */}
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
            {/* Delete Confirmation Modal */}
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