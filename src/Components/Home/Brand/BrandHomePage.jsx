import React from 'react'
import BrandCard from '../../Brand/BrandCard'
import BrandHomeHook from '../../../customHooks/Brand/BrandHomeHook'
import { Box, CircularProgress, Container, Grid, Stack } from '@mui/material'

const BrandHomePage = () => {

    const [loading, brand] = BrandHomeHook()

    return (

        < Container >


            <Box sx={{ padding: 2 }}>
                {/* Categories Grid */}
                <Stack container spacing={2} direction={'row'} justifyContent={'center'}>
                    {brand && brand.data ? brand.data.slice(0, 6).map((brand) => (
                        <Grid item xs={6} sm={4} md={2} key={brand._id}>
                            <BrandCard brand={brand} />
                        </Grid>
                    )) : <CircularProgress />}
                </Stack>
            </Box>
        </Container >
    )
}

export default BrandHomePage
