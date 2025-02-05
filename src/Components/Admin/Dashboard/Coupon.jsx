import React, { useState, useMemo } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, Typography, IconButton, Menu, MenuItem,
  InputAdornment, TextField, CircularProgress, Button, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import WarningModal from '../../Utils/WarningModal';
import AdminGetAllCouponHook from '../../../customHooks/Coupon/AdminGetAllCouponHook';
import AdminDeleteCouponHook from '../../../customHooks/Coupon/AdminDeleteCouponHook';
import PaginationTabs from '../../Utils/Pagination';

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};

const Coupon = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch coupons data
  const [coupons, loading, onPageChange, paginationResult, onSearch, onSort, setFilters] = AdminGetAllCouponHook();
  const [
    selectedProducts,
    setSelectedProducts,
    itemId,
    setItemId,
    isModalOpen,
    setIsModalOpen,
    handleCancelDelete,
    handleConfirmDelete,
  ] = AdminDeleteCouponHook();
console.log(coupons)
  // Handle search
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  // Handle sort field change
  const handleSortFieldChange = (field) => {
    setSortField(field);
  };

  // Handle sort order change
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
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
  const filteredRows = useMemo(() => {
    if (!coupons || !coupons.data || !Array.isArray(coupons.data)) return []; // Ensure it's an array
    return coupons.data
      .filter((row) =>
        Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a[sortField] < b[sortField] ? -1 : 1
          : a[sortField] > b[sortField] ? -1 : 1
      );
  }, [coupons, searchQuery, sortField, sortOrder]);

  // Loading state
  if (!coupons || !coupons.data) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Coupons
          </Typography>
          {/* Add New Coupon Button and Sort Controls */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/coupon/create"
                startIcon={<Add />}
              >
                Add New Coupon
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
                  <MenuItem value="discount">Discount</MenuItem>
                  <MenuItem value="expireDate">Expire Date</MenuItem>
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
          {/* Coupons Table */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Expire Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((coupon) => (
                      <TableRow hover key={coupon._id}>
                        <TableCell>{coupon.name}</TableCell>
                        <TableCell>{coupon.discount}%</TableCell>
                        <TableCell>{formatDate(coupon.expireDate)}</TableCell>
                        <TableCell>
                          <IconButton onClick={(event) => handleMenuOpen(event, coupon)}>
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No coupons found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Pagination */}
        <PaginationTabs paginationResult={paginationResult} onPageChange={onPageChange}/>
      </Paper>
      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={`/dashboard/coupon/update/${selectedRow?._id}`}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          setItemId(selectedRow?._id);
          setIsModalOpen(true);
        }} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
      {/* Delete Confirmation Modal */}
      <WarningModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this coupon?"
      />
    </Box>
  );
};

export default Coupon;