import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingProgress = ({loading}) => {
  return (
      <>
          {/* Loading Indicator in Top-Right Corner */}
          {loading && (
              <Box
                  sx={{
                      position: 'fixed',
                      top: 16,
                      right: 16,
                      zIndex: 1300, // Higher than most elements
                  }}
              >
                  <CircularProgress />
              </Box>
          )}

          <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
              {/* Rest of your UI */}
          </Box>
      </>
  )
}

export default LoadingProgress
