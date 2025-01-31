import { useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, Typography, IconButton, Chip, Menu, MenuItem,
    InputAdornment, TextField, TableSortLabel,
    Button
} from '@mui/material';
import { MoreVert, Search, Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteAnnouncement, getAllAnnouncement } from '../../../redux/action/announcementAction';
import WarningModal from '../../Utils/WarningModal';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const Announcement = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);

    const dispatch = useDispatch();
    const announcements = useSelector((state) => state.announcementReducer.getAllAnnouncement?.data || []);

    useEffect(() => {
        dispatch(getAllAnnouncement());
    }, [dispatch]);

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

    const handleDelete = () => {
        setIsModalOpen(true);
        setItemId(selectedRow._id);
        handleMenuClose();
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteAnnouncement(itemId));
        window.location.reload(true);
    };

    const filteredRows = announcements.filter((row) =>
        Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => (order === 'asc' ? (a[orderBy] < b[orderBy] ? -1 : 1) : (a[orderBy] > b[orderBy] ? -1 : 1)));

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Announcements
                    </Typography>
                    <Button
                        sx={{ m: 1 }}
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/dashboard/announcement/create"
                        startIcon={<Add />}
                    >
                        Add New Announcement
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
                                            active={orderBy === 'title'}
                                            direction={orderBy === 'title' ? order : 'asc'}
                                            onClick={() => handleRequestSort('title')}
                                        >
                                            Title
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announcement) => (
                                    <TableRow hover key={announcement._id}>
                                        <TableCell>
                                            <img src={announcement.image} alt={announcement.title} style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '10px',
                                                objectFit: 'cover',
                                            }} />
                                        </TableCell>
                                        <TableCell>{announcement.title}</TableCell>
                                        <TableCell>{announcement.desc}</TableCell>
                                        <TableCell>
                                            <Chip label={announcement.isActive ? 'Yes' : 'No'} color={announcement.isActive ? 'success' : 'default'} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => handleMenuOpen(event, announcement)}>
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                <MenuItem component={Link} to={`/dashboard/update/announcement/${selectedRow?._id}`}>
                    <Edit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
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
