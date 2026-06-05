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

  const cleanedItinerary =
    itinerary
      ?.replace(/\*\*/g, '')
      ?.trim()

  const days =
    cleanedItinerary
      ?.split(/(?=Day\s+\d+)/gi)
      ?.filter(
        (section: string) =>
          section.trim().startsWith('Day')
      ) || []

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

      <Typography
        variant="h4"
        sx={{
          color: 'white',
          mb: 3,
          fontWeight: 'bold'
        }}
      >
        Full Itinerary
      </Typography>

      {

        days.length > 0 ? (

          days.map(
            (
              day: string,
              index: number
            ) => {

              const lines =
                day
                  .split('\n')
                  .filter(
                    (line) =>
                      line.trim() !== ''
                  )

              const title =
                lines[0]

              const content =
                lines
                  .slice(1)
                  .join('\n')

              return (

                <Paper
                  key={index}
                  sx={{
                    background: '#111827',
                    color: 'white',
                    p: 4,
                    borderRadius: 4,
                    mb: 3,
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >

                  <Typography
                    variant="h5"
                    sx={{
                      color: '#60a5fa',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    📅 {title}
                  </Typography>

                  <Typography
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 2,
                      color: '#e5e7eb',
                      fontSize: '1rem'
                    }}
                  >
                    {content}
                  </Typography>

                </Paper>

              )

            }
          )

        ) : (

          <Paper
            sx={{
              background: '#111827',
              color: 'white',
              p: 4,
              borderRadius: 4
            }}
          >

            <Typography
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 2
              }}
            >
              {cleanedItinerary}
            </Typography>

          </Paper>

        )

      }

    </Box>

  )
}

export default ItineraryPage