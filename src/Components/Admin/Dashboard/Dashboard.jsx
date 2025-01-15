import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import {
    People,
    ShoppingCart,
    Inventory,
    Campaign,
    Insights,
    Category,
    BrandingWatermark,
    Discount,
    Subtitles
} from '@mui/icons-material';
import AdminSideBar from '../AdminSideBar';
import AdminGetAllProd from '../../../customHooks/Admin/AdminGetAllProd';

const Dashboard = () => {
    const [products] = AdminGetAllProd();//TODO make all like this 

    // Example data
    const data = {
        users: 120,
        products: 340,
        orders: 50,
        announcements: 12,
        analytics: 200,
        brands: 25,
        categories: 15,
        coupons: 8,
        subcategories: 30,
    };
    const dashboardItems = [
        {
            title: 'Users',
            value: data.users,
            icon: <People sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#E3F2FD',
        },
        {
            title: 'Products',
            value: products.numberOfDocuments,
            icon: <Inventory sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#E8F5E9',
        },
        {
            title: 'Orders',
            value: data.orders,
            icon: <ShoppingCart sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#FFF3E0',
        },
        {
            title: 'Announcements',
            value: data.announcements,
            icon: <Campaign sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#FCE4EC',
        },
        {
            title: 'Analytics',
            value: data.analytics,
            icon: <Insights sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#EDE7F6',
        },
        {
            title: 'Brands',
            value: data.brands,
            icon: <BrandingWatermark sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#F3E5F5',
        },
        {
            title: 'Categories',
            value: data.categories,
            icon: <Category sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#E8F5E9',
        },
        {
            title: 'Coupons',
            value: data.coupons,
            icon: <Discount sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#FFF3E0',
        },
        {
            title: 'Subcategories',
            value: data.subcategories,
            icon: <Subtitles sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#E3F2FD',
        },
    ];

    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            <AdminSideBar />
            <Box sx={{ padding: 4, backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: 4,
                        textAlign: 'center',
                    }}
                >
                    Admin Dashboard
                </Typography>

                <Grid container spacing={4}>
                    {dashboardItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 3,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    backgroundColor: item.bgColor,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '150px',
                                }}
                            >
                                {item.icon}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#374151',
                                        marginTop: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#374151' }}>
                                    {item.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
};

export default Dashboard;
