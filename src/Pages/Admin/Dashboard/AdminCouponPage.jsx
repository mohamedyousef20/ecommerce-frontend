import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box } from '@mui/material'
import Coupon from '../../../Components/Admin/Dashboard/Coupon'

const AdminCouponPage = () => {
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
                <Coupon />

            </Box>
        </Box>


    )
}

export default AdminCouponPage
