import React from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box } from '@mui/material'
import Category from '../../../Components/Admin/Dashboard/Category'
import AdminGetAllCategoryHook from '../../../customHooks/Admin/Category/AdminGetAllCategoryHook'

const AdminCategoryPage = () => {



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
                <Category />

            </Box>
        </Box>


    )
}

export default AdminCategoryPage
