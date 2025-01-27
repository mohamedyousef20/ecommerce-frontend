import React from 'react'
import Brand from '../../../Components/Admin/Dashboard/Brand'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box, Paper, Stack, Typography } from '@mui/material'
import NavbarLogged from '../../../Components/Utils/NavbarLogged'

const AdminAllBrandPage = () => {
  return (
    <Box sx={{
      backgroundColor: '#F5F5F5', // Neutral Color
      minHeight: '100vh'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{
          display: 'flex',
          flex: 1,
        }}>
          {/* Sidebar */}
          <Box sx={{
            width: 240,
            backgroundColor: '#1976D2', // Primary Color
            color: 'white',
            minHeight: 'calc(100vh - 64px)',
            position: 'fixed',
            left: 0,
            top: 64,
            zIndex: 1
          }}>
            <AdminSideBar />
          </Box>
          {/* Main content */}
          <Box sx={{
            flex: 1,
            ml: '240px',
            p: 3
          }}>
            <Paper sx={{
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0px 4px 16px rgba(43, 52, 69, 0.1)'
            }}>
              <Typography
                variant="h5"
                fontWeight={600}
                color="#1976D2"
                mb={3}
              >
               All Brands
              </Typography>
              <Brand />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminAllBrandPage
