import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Box, Typography } from '@mui/material';

const Rating = ({item}) => {
  return (
      <Box variant='h6'
          display={'flex'}
          alignItems={'center'}
        //   gap={1}
      >
          <StarOutlinedIcon sx={{ color: '#fbc500' }} />
          <Typography variant='h6' fontWeight={'600'}>{item.ratingsAverage}</Typography>
          <Typography color='#9d9d9d' fontSize={{ xs: '10px', md: '1rem' }}>({item.numberOfRating} Reviewers)</Typography>
      </Box>
  )
}

export default Rating
