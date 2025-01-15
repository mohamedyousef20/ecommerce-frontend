import React from 'react'
import CategoryCard from './CategoryCard'
import { CircularProgress, Stack } from '@mui/material'

import NotFound from '../Utils/NotFound';




const CategoryContainer = ({ data, loading }) => {



  return (

    <Stack gap={.5}
      direction={'row'}
      justifyContent={'center'}
      flexWrap={'wrap'}
      mt={'2rem'}

    >


      {loading === false ?
        (data ? data.map((item) => {

          return (<CategoryCard item={data} />)
        }
        ) : <NotFound />) : <CircularProgress size={50} thickness={4} color='#0295db' />
      }
    </Stack>
  )
}

export default CategoryContainer
