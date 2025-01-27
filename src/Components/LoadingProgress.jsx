import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const LoadingProgress = ({ loading }) => {
    return (
        <>
            {loading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        zIndex: 1300,
                        gap: 2
                    }}
                >
                    <CircularProgress 
                        size={60}
                        thickness={4}
                        sx={{
                            color: '#FF9800', // Warm orange color
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FF9800',
                            fontWeight: 500,
                            textAlign: 'center',
                            animation: 'fadeInOut 1.5s infinite',
                            '@keyframes fadeInOut': {
                                '0%': { opacity: 0.5 },
                                '50%': { opacity: 1 },
                                '100%': { opacity: 0.5 },
                            }
                        }}
                    >
                        Loading...
                    </Typography>
                </Box>
            )}
        </>
    )
}

export default LoadingProgress
