import React, { useState, useEffect } from 'react';
import { Pagination, Box, Typography, CircularProgress } from '@mui/material';

const PaginationTabs = ({ paginationResult, onPageChange }) => {
    const [page, setPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(null);
// console.log(paginationResult)
    // Update numberOfPage and current page when paginationResult changes
    useEffect(() => {
        if (paginationResult) {
            setNumberOfPage(paginationResult.numberOfPage);
            setPage(paginationResult.page);
        }
    }, [paginationResult]);

    const handleChange = (e, value) => {
        setPage(value); // Update the local state for UI
        if (onPageChange) {
            onPageChange(value); // Notify the parent about the page change
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Show loader if numberOfPage is not yet available */}
            {numberOfPage === null ? (
                <CircularProgress sx={{ marginY: '2rem' }} />
            ) : (
                <>
                    <Pagination
                        onChange={handleChange}
                        page={page}
                        count={numberOfPage}
                        variant="outlined"
                        shape="rounded"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginY: '1rem',
                            '& .MuiPaginationItem-root': {
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                '&:hover': {
                                    backgroundColor: '#ddd',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                },
                            },
                        }}
                    />
                    <Typography variant="body2" sx={{ marginTop: '1rem', color: '#555' }}>
                        Page {page} of {numberOfPage}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default PaginationTabs;
