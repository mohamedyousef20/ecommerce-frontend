import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import Orders from '../../../Components/Admin/Dashboard/Order'
import { Box, PaginationItem } from '@mui/material'
import PaginationTabs from '../../../Components/Utils/Pagination'

const AdminOrderPage = () => {
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
                <Orders />

            </Box>
        </Box>


    )
}

export default AdminOrderPage
