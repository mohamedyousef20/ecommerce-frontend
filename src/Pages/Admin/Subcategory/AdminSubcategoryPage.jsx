import React from 'react'
import Subcategory from '../../../Components/Admin/Dashboard/Subcategory'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box } from '@mui/material'

const AdminSubcategoryPage = () => {
    return (
        <Box sx={{ display: 'flex', background: '#d0d0d238', gap: 1 }}>
            {/* Sidebar */}
            <AdminSideBar />
            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: '20px',
                    transition: 'margin 0.3s ease',
                }}
            >
                <Subcategory />

            </Box>
        </Box>
    )
}

export default AdminSubcategoryPage
