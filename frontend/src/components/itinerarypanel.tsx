import {
  Paper,
  Typography,
  Box,
  Link
} from '@mui/material'

function ItineraryPanel({
  summary,
  onOpenItinerary
}: any) {

  return (
    <Paper
      sx={{
        background: '#111827',
        color: 'white',
        p: 2,
        borderRadius: 3,
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Trip Summary
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Typography>
          📍 {summary?.destination || "Waiting..."}
        </Typography>

        <Typography>
          💰 ₹{summary?.budget?.toLocaleString?.() || 0}
        </Typography>

        <Typography>
          🏨 {summary?.hotelCount || 0} Hotels Found
        </Typography>

        <Typography>
          📍 {summary?.attractionCount || 0} Attractions Found
        </Typography>

        <Typography>
          🎯 Budget Successfully Allocated
        </Typography>

        <Box sx={{ mt: 3 }}>

          <Link
            component="button"
            underline="hover"
            onClick={onOpenItinerary}
            sx={{
              color: '#60a5fa',
              cursor: 'pointer'
            }}
          >
            See Full Itinerary →
          </Link>

        </Box>

      </Box>

    </Paper>
  )
}

export default ItineraryPanel