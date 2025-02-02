import React from 'react'
import Brand from '../../../Components/Admin/Dashboard/Brand'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box, Paper, Stack, Typography } from '@mui/material'
import NavbarLogged from '../../../Components/Utils/NavbarLogged'

const AdminAllBrandPage = () => {
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
        <Brand />

      </Box>
    </Box>

  );
}

export default AdminAllBrandPage
