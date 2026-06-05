import {
  Paper,
  Typography,
  Box,
  Link,
  Divider
} from '@mui/material'

function ItineraryPanel({
  summary,
  onOpenItinerary
}: any) {

  const hasTrip =
    summary?.destination

  return (

    <Paper
      sx={{
        background: '#111827',
        color: 'white',
        p: 3,
        borderRadius: 4,
        height: '100%',
        overflow: 'hidden'
      }}
    >

      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 'bold'
        }}
      >
        Trip Summary
      </Typography>

      {
        !hasTrip ? (

          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Typography
              sx={{
                color: '#9ca3af'
              }}
            >
              Plan a trip to see summary
            </Typography>
          </Box>

        ) : (

          <Box>

            <Typography
              sx={{
                color: '#9ca3af',
                fontSize: 13
              }}
            >
              Destination
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 'bold'
              }}
            >
              📍 {summary.destination}
            </Typography>

            <Divider
              sx={{
                borderColor: '#374151',
                mb: 2
              }}
            />

            <Typography
              sx={{
                color: '#9ca3af',
                fontSize: 13
              }}
            >
              Budget
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 2 }}
            >
              💰 ₹{summary.budget?.toLocaleString()}
            </Typography>

            <Divider
              sx={{
                borderColor: '#374151',
                mb: 2
              }}
            />

            <Typography sx={{ mb: 1 }}>
              🏨 Hotels Found: {summary.hotelCount || 0}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              🎯 Attractions Found: {summary.attractionCount || 0}
            </Typography>

            <Link
              component="button"
              underline="hover"
              onClick={onOpenItinerary}
              sx={{
                color: '#60a5fa',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              See Full Itinerary →
            </Link>

          </Box>

        )
      }

    </Paper>

  )
}

export default ItineraryPanel