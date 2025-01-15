import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import Users from '../../../Components/Admin/Dashboard/Users'
import { Box } from '@mui/material'

const AdminUserPage = () => {
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
                <Users />

            </Box>
        </Box>


    )
}

export default AdminUserPage
