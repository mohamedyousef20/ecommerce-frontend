import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, Typography, IconButton, Menu, MenuItem,
  InputAdornment, TextField, CircularProgress, Button, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PaginationTabs from '../../Utils/Pagination';
import AdminDeleteCategoryHook from '../../../customHooks/Admin/Category/AdminDeleteCategoryHook';
import AdminGetAllCategoryHook from '../../../customHooks/Category/AdminGetAllCategoryHook';
import WarningModal from '../../Utils/WarningModal';

const Categories = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch categories data
  const [category, loading, onPageChange, paginationResult, onSearch, onSort, setFilters] = AdminGetAllCategoryHook();

  const [
    isModalOpen,
    setIsModalOpen,
    categoryIdToDelete,
    setCategoryIdToDelete,
    handleOpenModal,
    handleCloseModal,
    handleConfirmDelete
  ] = AdminDeleteCategoryHook();

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
    category && category.data
      ? category.data
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
  if (!category || !category.data) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Categories
          </Typography>
          {/* Add New Category Button and Sort Controls */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/category/create"
                startIcon={<Add />}
              >
                Add New Category
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
          {/* Categories Table */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((category) => (
                      <TableRow hover key={category._id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          <img
                            src={category.image}
                            alt={category.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '10px',
                              objectFit: 'cover',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={(event) => handleMenuOpen(event, category)}>
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No categories found.
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
        <MenuItem component={Link} to={`/dashboard/category/update/${selectedRow?._id}`}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          setCategoryIdToDelete(selectedRow?._id);
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
        message="Are you sure you want to delete this category?"
      />
    </Box>
  );
};

export default Categories;