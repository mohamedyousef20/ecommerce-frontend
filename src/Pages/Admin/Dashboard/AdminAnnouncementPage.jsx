import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import Products from '../../../Components/Admin/Dashboard/Products'
import { Box } from '@mui/material'
import Announcement from '../../../Components/Admin/Dashboard/Announcement'

const AdminAnnouncementPage = () => {
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
                <Announcement />

            </Box>
        </Box>


    )
}

export default AdminAnnouncementPage
