import React from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    TablePagination,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminGetAllOrderHook from '../../customHooks/Admin/Order/AdminGetAllOrderHook';
import LoadingProgress from '../../Components/LoadingProgress';

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'warning';
        case 'processing':
            return 'info';
        case 'shipped':
            return 'primary';
        case 'delivered':
            return 'success';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const AdminGetAllOrderPage = () => {
    const [
        orders,
        loading,
        pageCount,
        getPage,
        handleSearch,
        searchWord,
        setSearchWord,
    ] = AdminGetAllOrderHook();

    return (
        <Box sx={{ 
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#F8FAFC'
        }}>
            <LoadingProgress loading={loading} />
            <AdminSideBar />
            
            <Box sx={{ 
                flexGrow: 1,
                ml: '280px',
                p: 4
            }}>
                <Container maxWidth="lg">
                    <Paper sx={{
                        p: 4,
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    }}>
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4
                        }}>
                            <Typography variant="h5" fontWeight={600} color="#1976D2">
                                Orders
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            placeholder="Search orders..."
                            value={searchWord}
                            onChange={(e) => {
                                setSearchWord(e.target.value);
                                handleSearch(e);
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Payment</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders?.map((order) => (
                                        <TableRow key={order._id} hover>
                                            <TableCell>#{order.orderNumber || order._id.slice(-6)}</TableCell>
                                            <TableCell>{order.user?.name || 'N/A'}</TableCell>
                                            <TableCell>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>${order.totalOrderPrice}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.status}
                                                    color={getStatusColor(order.status)}
                                                    size="small"
                                                    sx={{ borderRadius: '8px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.isPaid ? 'Paid' : 'Unpaid'}
                                                    color={order.isPaid ? 'success' : 'warning'}
                                                    size="small"
                                                    sx={{ borderRadius: '8px' }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    component={Link}
                                                    to={`/dashboard/orders/${order._id}`}
                                                    sx={{ 
                                                        color: '#1976D2',
                                                        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={pageCount || 0}
                            rowsPerPage={10}
                            page={getPage - 1}
                            onPageChange={(e, newPage) => getPage(newPage + 1)}
                            rowsPerPageOptions={[10]}
                            sx={{
                                mt: 2,
                                '.MuiTablePagination-select': {
                                    borderRadius: '8px',
                                }
                            }}
                        />
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminGetAllOrderPage;
