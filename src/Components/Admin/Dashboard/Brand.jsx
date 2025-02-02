import React, { useState, useMemo } from 'react';
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
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  TextField,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdminDeleteBrandHook from '../../../customHooks/Admin/Brand/AdminDeleteBrandHook';
import AdminGetAllBrandHook from '../../../customHooks/Admin/Brand/AdminGetAllBrandHook';
import WarningModal from '../../Utils/WarningModal';
import PaginationTabs from '../../Utils/Pagination';

const Brands = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch brands data
  const [brands, paginationResult, onPageChange, onSearch, onSort, setFilters] = AdminGetAllBrandHook();
  const [open, setOpen, itemId, setItemId, isModalOpen, setIsModalOpen, handleConfirmDelete, handleCancelDelete] =
    AdminDeleteBrandHook();

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
  const filteredRows = useMemo(() => {
    if (!brands || !brands.data || !Array.isArray(brands.data)) return []; // Ensure it's an array
    return brands.data
      .filter((row) =>
        Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a[sortField] < b[sortField] ? -1 : 1
          : a[sortField] > b[sortField] ? -1 : 1
      );
  }, [brands, searchQuery, sortField, sortOrder]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Brands
          </Typography>
          {/* Add New Brand Button and Sort Controls */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/brand/create"
                startIcon={<Add />}
              >
                Add New Brand
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
          {/* Brands Table */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!brands || !brands.data ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No brands found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((brand) => (
                      <TableRow hover key={brand._id}>
                        <TableCell>
                          <img
                            src={brand.image}
                            alt={brand.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '10px',
                              objectFit: 'cover',
                            }}
                          />
                        </TableCell>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>
                          <IconButton onClick={(event) => handleMenuOpen(event, brand)}>
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to={`/dashboard/brand/update/${selectedRow?._id}`}>
          <Edit sx={{ mr: 1 }} /> Edit
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
        message="Are you sure you want to delete this brand?"
      />
    </Box>
  );
};

export default Brands;