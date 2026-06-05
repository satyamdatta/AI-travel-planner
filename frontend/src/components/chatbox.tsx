import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'


function ChatBox({ sendMessage }: any) {

  const [query, setQuery] = useState('')


  const handleSend = () => {
    if (!query.trim()) return

    sendMessage(query)

    setQuery('')
  }


  return (
    <Box sx={{ display: "flex", gap: 2 }}>

      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {

          if (e.key === "Enter") {

            e.preventDefault()

            handleSend()
          }

        }}
        placeholder="Plan my trip....e.g. Plan my trip to {abc} within {xyz} budget"
        sx={{
          input: {
            color: 'white'
          }
        }}
      />

      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>

    </Box>
  )
}


export default ChatBox