import React from 'react'
import Brand from '../../../Components/Admin/Dashboard/Brand'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box, Stack } from '@mui/material'
import NavbarLogged from '../../../Components/Utils/NavbarLogged'

const AdminAllBrandPage = () => {
  return (
    <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Navbar at the Top */}

      {/* Layout with Sidebar and Content */}
      <Stack direction="row" spacing={2} sx={{ height: 'calc(100vh - 64px)' }}>
        <AdminSideBar />
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Brand />
        </Box>
      </Stack>
    </Box>
  );
}

export default AdminAllBrandPage
