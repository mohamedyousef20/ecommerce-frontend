import { useEffect, useState, useMemo } from 'react';
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
  TableSortLabel,
  CircularProgress,
  Button,
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdminDeleteBrandHook from '../../../customHooks/Admin/Brand/AdminDeleteBrandHook';
import AdminGetAllBrandHook from '../../../customHooks/Admin/Brand/AdminGetAllBrandHook';
import WarningModal from '../../Utils/WarningModal';

const Brands = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch brands data
  const [brands] = AdminGetAllBrandHook();
  const [open,
    setOpen,
    itemId,
    setItemId,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete, 
    handleCancelDelete] =
    AdminDeleteBrandHook();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };




  // Filter and sort logic
  const filteredRows = useMemo(() => {
    if (!brands || !brands.data || !Array.isArray(brands.data)) return []; // Ensure it's an array
    return brands.data
      .filter((row) =>
        Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) =>
        order === 'asc' ? (a[orderBy] < b[orderBy] ? -1 : 1) : (a[orderBy] > b[orderBy] ? -1 : 1)
      );
  }, [brands, searchQuery, order, orderBy]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Brands
          </Typography>
          <Button
            sx={{ m: 1 }}

            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard/order/create"
            startIcon={<Add />}
          >
            Add New  Brand
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
                  <TableCell>Logo</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!brands || !brands.data ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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
                            src={brand.logo}
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
                        <TableCell>{brand.country || 'N/A'}</TableCell>
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCancelDelete}>
        <MenuItem component={Link} to={`/dashboard/brand/update/${selectedRow?._id}`}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          setItemId(selectedRow?._id);
          setIsModalOpen(true);
        }} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
       
      </Menu>
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