import {
  Button,
  Box
} from '@mui/material'

function Navbar({
  page,
  setPage
}: any) {

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1
      }}
    >
      <Button
        size="small"
        variant={
          page === 'dashboard'
            ? 'contained'
            : 'outlined'
        }
        onClick={() =>
          setPage('dashboard')
        }
      >
        Dashboard
      </Button>

      <Button
        size="small"
        variant={
          page === 'itinerary'
            ? 'contained'
            : 'outlined'
        }
        onClick={() =>
          setPage('itinerary')
        }
      >
        Itinerary
      </Button>
    </Box>
  )
}

export default Navbar