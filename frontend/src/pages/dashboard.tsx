import { useEffect, useState } from 'react'

import {
  Box,
  Grid,
  Typography,
  Paper
} from '@mui/material'

import ChatBox from '../components/chatbox'
import LogsPanel from '../components/logspanel'
import ToolCard from '../components/toolcard'
import ItineraryPanel from '../components/itinerarypanel'
import AgentGraph from '../components/agentgraph'
import BudgetChart from '../components/BudgetChart'
import Navbar from '../components/Navbar'

import { connectSocket } from '../services/websocket'


function Dashboard({
  page,
  setPage,
  setItinerary
}: any) {

  // -----------------------------
  // STATES
  // -----------------------------

  const [logs, setLogs] = useState<string[]>([])

  const [tools, setTools] = useState<any[]>([])

  const [allocation, setAllocation] = useState<any>(null)

  const [tripSummary, setTripSummary] = useState<any>(null)

  const [steps, setSteps] = useState({
    parse: "pending",
    extract: "pending",
    allocate: "pending",
    validate: "pending",
    search: "pending",
    hotels: "pending",
    itinerary: "pending",
    final: "pending"
  })

  const [socket, setSocket] = useState<WebSocket | null>(null)


  // -----------------------------
  // CONNECT WEBSOCKET
  // -----------------------------

  useEffect(() => {

    const ws = connectSocket()

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data)

      // STEP STATUS

      if (data.type === 'step') {

        setSteps(prev => ({
          ...prev,
          [data.step]: data.status
        }))
      }

      // LOGS

      if (data.type === 'log') {

        setLogs(prev => [
          ...prev,
          data.message
        ])
      }

      // TOOLS

      if (data.type === 'tool') {

        setTools(prev => [
          ...prev,
          data.data
        ])

        if (data.data.tool === "Budget Allocator") {

          setAllocation(
            data.data.output
          )

          setTripSummary((prev: any) => ({
            ...prev,
            destination:
              data.data.input.destination,

            budget:
              data.data.input.budget
          }))
        }

        if (data.data.tool === "Attraction Search") {

          setTripSummary((prev: any) => ({
            ...prev,
            attractionCount:
              data.data.output.length
          }))
        }

        if (data.data.tool === "Hotel Search") {

          setTripSummary((prev: any) => ({
            ...prev,
            hotelCount:
              data.data.output.length
          }))
        }
      }

      // FINAL RESPONSE

      if (data.type === 'final') {
        setItinerary(
          data.message
        )
      }
    }

    setSocket(ws)

  }, [])


  // -----------------------------
  // SEND MESSAGE
  // -----------------------------

  const sendMessage = (query: string) => {

    setLogs([])

    setTools([])

    setAllocation(null)

    setTripSummary(null)

    setSteps({
      parse: "pending",
      extract: "pending",
      allocate: "pending",
      validate: "pending",
      search: "pending",
      hotels: "pending",
      itinerary: "pending",
      final: "pending"
    })

    socket?.send(
      JSON.stringify({ query })
    )
  }


  // -----------------------------
  // UI
  // -----------------------------

  return (

    <Box
      sx={{
        minHeight: '100vh',
        background: '#050816',
        padding: 3
      }}
    >

      {/* HEADER */}

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


      {/* MAIN GRID */}

      <Grid container spacing={2}>

        {/* GRAPH */}

        <Grid size={8}>

          <Paper
            sx={{
              background: '#111827',
              borderRadius: 4,
              p: 2,
              height: '320px'
            }}
          >
            <Typography
              sx={{
                color: 'white',
                mb: 2
              }}
            >
              Agent Execution Flow
            </Typography>

            <AgentGraph steps={steps} />

          </Paper>

        </Grid>


        {/* BUDGET PIE CHART */}

        <Grid size={4}>

          <Box
            sx={{
              mb: 2
            }}
          >

            <BudgetChart
              allocation={allocation}
            />

          </Box>

        </Grid>


        {/* LOGS */}

        <Grid size={4}>

          <Box
            sx={{
              height: '350px'
            }}
          >
            <LogsPanel logs={logs} />
          </Box>

        </Grid>


        {/* TOOLS */}

        <Grid size={4}>

          <Paper
            sx={{
              background: '#111827',
              borderRadius: 4,
              p: 2,
              height: '360px',
              overflowY: 'auto'
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Tool Calls
            </Typography>

            {
              tools.map((tool, index) => (
                <ToolCard
                  key={index}
                  tool={tool}
                />
              ))
            }

          </Paper>

        </Grid>


        {/* ITINERARY */}

        <Grid size={4}>

          <Box
            sx={{
              height: '360px'
            }}
          >

            <ItineraryPanel
              summary={tripSummary}
              onOpenItinerary={() => {

                setPage(
                  'itinerary'
                )
              }}
            />

          </Box>

        </Grid>

      </Grid>


      {/* CHAT BOX */}

      <Box sx={{ mt: 3 }}>

        <ChatBox sendMessage={sendMessage} />

      </Box>

    </Box>
  )
}

export default Dashboard