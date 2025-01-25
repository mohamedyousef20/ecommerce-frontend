import { ErrorOutline, NotificationsPausedOutlined } from '@mui/icons-material'
import { Alert, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Typography fontSize={'1.5rem'} fontWeight={600} >
      <Alert severity='info'>  Opps  , No data has found , please refresh the page  <ErrorOutline /> </Alert>
    </Typography>
  )
}

export default NotFound
