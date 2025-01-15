// src/components/Analytics.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Users',
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Orders',
                data: [2, 5, 1, 7, 6, 4, 3],
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
            },
            {
                label: 'Sales',
                data: [15, 13, 8, 5, 12, 10, 6],
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
            },
        ],
    };

    return (

        <Box flex={1}>
            <Typography variant="h4">Analytics</Typography>
            <Line data={data} />
        </Box>
    );
};

export default Analytics;
