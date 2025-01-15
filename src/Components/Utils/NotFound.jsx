import { ErrorOutline, NotificationsPausedOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Typography fontSize={'1.5rem'} fontWeight={600} >
      Opps  , No Data Has Found , Please Refresh The page  <ErrorOutline/>
    </Typography>
  )
}

export default NotFound
