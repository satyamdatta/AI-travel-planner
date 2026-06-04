import { Card, CardContent, Typography } from '@mui/material'

export default function ToolCard({ tool }: any) {

  if (!tool) return null

  console.log(tool.tool)

  const renderContent = () => {

    // ------------------
    // BUDGET
    // ------------------

    if (tool.tool === "Budget Allocator") {

      return (
        <>
          <Typography>
            📍 {tool.input.destination}
          </Typography>

          <Typography>
            💰 ₹{tool.input.budget}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            ✈ Flights: ₹{tool.output.flight_cost}
          </Typography>

          <Typography>
            🏨 Hotels: ₹{tool.output.hotel_cost}
          </Typography>

          <Typography>
            🍔 Food: ₹{tool.output.food_cost}
          </Typography>

          <Typography>
            🚕 Travel: ₹{tool.output.travel_cost}
          </Typography>

          <Typography>
            🎡 Activities: ₹{tool.output.activities_cost}
          </Typography>
        </>
      )
    }

    // ------------------
    // ATTRACTIONS
    // ------------------

    if (tool.tool === "Attraction Search") {

      return (
        <>
          {
            tool.output.map(
              (place: string, index: number) => (
                <Typography key={index}>
                  📍 {place}
                </Typography>
              )
            )
          }
        </>
      )
    }

    // ------------------
    // HOTELS
    // ------------------

    if (tool.tool === "Hotel Search") {

      return (
        <>
          {
            tool.output.map(
              (hotel: string, index: number) => (
                <Typography key={index}>
                  🏨 {hotel}
                </Typography>
              )
            )
          }
        </>
      )
    }

    // ------------------
    // FALLBACK
    // ------------------

    return (
      <Typography>
        ✅ Tool completed
      </Typography>
    )
  }

  return (
    <Card
      sx={{
        background: '#111827',
        color: 'white',
        mb: 2,
        borderRadius: 3
      }}
    >
      <CardContent>

        <Typography
          sx={{
            fontWeight: "bold",
            color: "#60a5fa",
            mb: 1
          }}
        >
          🔧 {tool.tool}
        </Typography>

        {renderContent()}

      </CardContent>
    </Card>
  )
}