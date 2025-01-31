import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TextField,
    IconButton,
    Typography,
    Chip,
    Menu,
    MenuItem,
    InputAdornment,
    TableSortLabel,
    CircularProgress,
    Button,
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import WarningModal from '../../Utils/WarningModal';
import AdminGetAllOrderHook from '../../../customHooks/Admin/Order/AdminGetAllOrderHook';
import { deleteOrder, updateOrderDeliver } from '../../../redux/action/orderAction';
import AdminUpdateOrderPayment from '../../../customHooks/Admin/Order/AdminUpdateOrderPayment';
import LoadingProgress from '../../LoadingProgress';
import { useDispatch } from 'react-redux/lib/exports';
import Notification from '../../../customHooks/useNotification';

// Helper function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

const ProductOrderManagement = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('totalOrderPrice');
    const [order, setOrder] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch orders data
    const [orders] = AdminGetAllOrderHook();
    const dispatch = useDispatch();
    const [handleUpdatePayment] = AdminUpdateOrderPayment(itemId);

    // Handle sorting
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

    // Handle update delivery status
    const handleUpdateDeliver = (id) => {
        setLoading(true)
        dispatch(updateOrderDeliver(id));
        setLoading(false);
        window.location.reload(true)

    };

    // Handle delete confirmation
    const handleConfirmDelete = async () => {

        setLoading(true);
        await dispatch(deleteOrder(itemId))
        setLoading(false)
        Notification('Deleting order successfully....')
        setIsModalOpen(false);
        window.location.reload(true);
    };

    // Handle cancel delete
    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    // Filter and sort data
    const filteredRows = orders && orders.data
        ? orders.data
            .filter((row) =>
                Object.values(row)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                if (order === 'asc') {
                    return a[orderBy] < b[orderBy] ? -1 : 1;
                } else {
                    return a[orderBy] > b[orderBy] ? -1 : 1;
                }
            })
        : [];

    return (
        <Box sx={{ width: '100%' }}>
            <LoadingProgress loading={loading} />
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Order Management
                    </Typography>

                    
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
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'totalOrderPrice'}
                                            direction={orderBy === 'totalOrderPrice' ? order : 'asc'}
                                            onClick={() => handleRequestSort('totalOrderPrice')}
                                        >
                                            Total
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Delivered</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!orders || !orders.data ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order) => (
                                            <TableRow hover key={order._id}>
                                                <TableCell>${order.totalOrderPrice}</TableCell>
                                                <TableCell>{formatDate(order.updatedAt)}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color={order.isPaid ? 'success' : 'info'}
                                                        onClick={() => handleUpdatePayment(order._id)}
                                                    >
                                                        {order.isPaid ? formatDate(order.isPaidAt) : 'Mark as Paid'}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color={order.isDelivered ? 'success' : 'secondary'}
                                                        onClick={() => handleUpdateDeliver(order._id)}
                                                    >
                                                        {order.isDelivered ? formatDate(order.deliveredAt) : 'Mark as Delivered'}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(event) => handleMenuOpen(event, order)}
                                                    >
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
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

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={`/dashboard/order/${selectedRow?._id}/details`}>
                    <Visibility sx={{ mr: 1 }} /> View Details
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setItemId(selectedRow?._id);
                        setIsModalOpen(true);
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Modal */}
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this order?"
            />
        </Box>
    );
};

export default ProductOrderManagement;