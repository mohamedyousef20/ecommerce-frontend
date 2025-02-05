import { useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, Typography, IconButton, Chip, Menu, MenuItem,
    InputAdornment, TextField, TableSortLabel, Button, Select, FormControl, InputLabel, Grid, Switch
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteAnnouncement, getAllAnnouncement, activeAnnouncement } from '../../../redux/action/announcementAction';
import WarningModal from '../../Utils/WarningModal';
import PaginationTabs from '../../Utils/Pagination';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const Announcement = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('title'); // Default sort field
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [filters, setFilters] = useState({ page: 1, limit: 5, keyword: '', sort: '', fields: '' });

    const dispatch = useDispatch();
    const allAnnouncement = useSelector((state) => state.announcementReducer.getAllAnnouncement?.data || []);
    let paginationResult = allAnnouncement?.paginationResult || {};

    // Handle page change
    const onPageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    // Handle search
    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchQuery(keyword);
        setFilters((prev) => ({ ...prev, keyword, page: 1 }));
    };

    // Handle sort field change
    const handleSortFieldChange = (field) => {
        setSortField(field);
        const sortString = sortOrder === 'asc' ? field : `-${field}`;
        setFilters((prev) => ({ ...prev, sort: sortString }));
    };

    // Handle sort order change
    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        const sortString = order === 'asc' ? sortField : `-${sortField}`;
        setFilters((prev) => ({ ...prev, sort: sortString }));
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setFilters((prev) => ({ ...prev, limit: newRowsPerPage, page: 1 }));
    };

    // Fetch announcements on filters change
    useEffect(() => {
        dispatch(getAllAnnouncement(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ));
    }, [filters, dispatch]);

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

    // Handle delete
    const handleDelete = () => {
        setIsModalOpen(true);
        setItemId(selectedRow._id);
        handleMenuClose();
    };

    // Handle confirm delete
    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteAnnouncement(itemId));
        window.location.reload(true);
    };

    // Handle toggle active status
    const handleToggleActive = async (announcement) => {
        const updatedStatus = !announcement.isActive;
        await dispatch(activeAnnouncement(announcement._id, { isActive: updatedStatus }));
        // Refresh the data after updating the status
        dispatch(getAllAnnouncement(
            filters.page,
            filters.limit,
            filters.keyword,
            filters.sort,
            filters.fields
        ));
    };

    // Filter and sort logic
    const filteredRows = allAnnouncement
        .filter((row) =>
            Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === 'asc'
                ? a[sortField] < b[sortField] ? -1 : 1
                : a[sortField] > b[sortField] ? -1 : 1
        );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Announcements
                    </Typography>
                    {/* Add New Announcement Button and Sort Controls */}
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/dashboard/announcement/create"
                                startIcon={<Add />}
                            >
                                Add New Announcement
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
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="isActive">Active</MenuItem>
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
                    {/* Announcements Table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.length > 0 ? (
                                    filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((announcement) => (
                                            <TableRow hover key={announcement._id}>
                                                <TableCell>
                                                    <img
                                                        src={announcement.image}
                                                        alt={announcement.title}
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            borderRadius: '10px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{announcement.title}</TableCell>
                                                <TableCell>{announcement.desc}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={announcement.isActive}
                                                        onChange={() => handleToggleActive(announcement)}
                                                        color="primary"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={(event) => handleMenuOpen(event, announcement)}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No announcements found.
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
                <MenuItem component={Link} to={`/dashboard/update/announcement/${selectedRow?._id}`}>
                    <Edit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
            {/* Delete Confirmation Modal */}
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsModalOpen(false)}
                message="Are you sure you want to delete this Announcement?"
            />
        </Box>
    );
};

export default Announcement;