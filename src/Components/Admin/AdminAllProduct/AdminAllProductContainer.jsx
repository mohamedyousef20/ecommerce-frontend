import React from 'react'
import ProductTable from './ProductTableContainer';
import { Box, CssBaseline } from '@mui/material';
const AdminAllProductContainer = ({ product }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                }}
            >
                <ProductTable product={product} />
            </Box>
        </Box>
    )
}

export default AdminAllProductContainer
