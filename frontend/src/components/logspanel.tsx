import { Paper, Typography } from '@mui/material'


function LogsPanel({ logs }: any) {

  return (
    <Paper
      sx={{
        background: '#111827',
        color: 'white',
        p: 2,
        borderRadius: 3,
        height: 300,
        overflowY: 'auto'
      }}
    >
      <Typography variant="h6" sx={{mb:2}}>
        Agent Logs
      </Typography>

      {
        logs.map((log: string, index: number) => (
          <Typography key={index} 
          sx={{mb:1}}>
            {log}
          </Typography>
        ))
      }
    </Paper>
  )
}


export default LogsPanel