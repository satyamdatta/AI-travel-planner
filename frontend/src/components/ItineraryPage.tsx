import {
  Box,
  Paper,
  Typography
} from '@mui/material'

import Navbar from '../components/Navbar'

function ItineraryPage({
  itinerary,
  page,
  setPage
}: any) {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#050816',
        p: 3
      }}
    >

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          AI Travel Planner
        </Typography>

        <Navbar
          page={page}
          setPage={setPage}
        />

      </Box>

      <Paper
        sx={{
          background: '#111827',
          color: 'white',
          p: 3,
          borderRadius: 4
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3 }}
        >
          Full Itinerary
        </Typography>

        <Typography
          sx={{
            whiteSpace: 'pre-wrap',
            lineHeight: 2
          }}
        >
          {itinerary}
        </Typography>

      </Paper>

    </Box>
  )
}

export default ItineraryPage