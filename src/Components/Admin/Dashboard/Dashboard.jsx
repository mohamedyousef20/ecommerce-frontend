import React, { useEffect, useState } from 'react';
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
import AdminGetAllProd from '../../../customHooks/Admin/AdminGetAllProd';
import GetAllAnnouncementHook from '../../../customHooks/Admin/Announcement/GetAllAnnouncementHook';
import AdminGetAllCategoryHook from '../../../customHooks/Category/AdminGetAllCategoryHook';
import AdminGetAllCouponHook from '../../../customHooks/Coupon/AdminGetAllCouponHook';
import AdminGetAllUserHook from '../../../customHooks/Admin/User/AdminGetAllUserHook';
import AdminGetAllOrderHook from '../../../customHooks/Admin/Order/AdminGetAllOrderHook';
import AdminGetAllBrandHook from '../../../customHooks/Admin/Brand/AdminGetAllBrandHook';
import AdminSideBar from '../AdminSideBar';

const Dashboard = () => {
    const [products] = AdminGetAllProd();
    const [announcements] = GetAllAnnouncementHook();
    const [category] = AdminGetAllCategoryHook();
    const [coupons] = AdminGetAllCouponHook();
    const [users] = AdminGetAllUserHook();
    const [orders] = AdminGetAllOrderHook();
    const [brands] = AdminGetAllBrandHook();
    
    // State to store data when available
    const [dashboardData, setDashboardData] = useState({
        users: 0,//TODO
        products: 0,
        orders: 0,
        announcements: 0,
        brands: 0,
        categories: 0,
        coupons: 0,
    });
    // Update state when data is available
    useEffect(() => {
        // Only update state if data actually changes
        const newData = {
            users: users?.numberOfDocuments || dashboardData.users,
            products: products?.numberOfDocuments || dashboardData.products,
            orders: orders?.numberOfDocuments || dashboardData.orders,
            announcements: announcements?.numberOfDocuments || dashboardData.announcements,
            brands: brands?.numberOfDocuments || dashboardData.brands,
            categories: category?.numberOfDocuments || dashboardData.categories,
            coupons: coupons?.numberOfDocuments || dashboardData.coupons,
        };

        // Compare old and new data to prevent unnecessary updates
        if (
            newData.users !== dashboardData.users ||
            newData.products !== dashboardData.products ||
            newData.orders !== dashboardData.orders ||
            newData.announcements !== dashboardData.announcements ||
            newData.brands !== dashboardData.brands ||
            newData.categories !== dashboardData.categories ||
            newData.coupons !== dashboardData.coupons
        ) {
            setDashboardData(newData);
        }
    }, [users, products, orders, announcements, brands, coupons, category, dashboardData]);


    // Example data
    const dashboardItems = [
        {
            title: 'Users', value:
                dashboardData.users,
            icon: <People sx={{ fontSize: 40, color: '#3B82F6' }} />,
            bgColor: '#E3F2FD'
        },
        { title: 'Products', value: dashboardData.products, icon: <Inventory sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#E8F5E9' },
        { title: 'Orders', value: dashboardData.orders, icon: <ShoppingCart sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#FFF3E0' },
        { title: 'Announcements', value: dashboardData.announcements, icon: <Campaign sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#FCE4EC' },
        { title: 'Brands', value: dashboardData.brands, icon: <BrandingWatermark sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#F3E5F5' },
        { title: 'Categories', value: dashboardData.categories, icon: <Category sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#E8F5E9' },
        { title: 'Coupons', value: dashboardData.coupons, icon: <Discount sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#FFF3E0' },
        // { title: 'Subcategories', value: dashboardData.subcategories, icon: <Subtitles sx={{ fontSize: 40, color: '#3B82F6' }} />, bgColor: '#E3F2FD' },
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
