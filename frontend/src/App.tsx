import { useState } from 'react'

import Dashboard from './pages/dashboard'
import ItineraryPage from './components/ItineraryPage'

function App() {

  const [page, setPage] =
    useState('dashboard')

  const [itinerary, setItinerary] =
    useState('')

  return (

    <>
      <div
        style={{
          display:
            page === 'dashboard'
              ? 'block'
              : 'none'
        }}
      >
        <Dashboard
          page={page}
          setPage={setPage}
          setItinerary={setItinerary}
        />
      </div>

      <div
        style={{
          display:
            page === 'itinerary'
              ? 'block'
              : 'none'
        }}
      >
        <ItineraryPage
          itinerary={itinerary}
          page={page}
          setPage={setPage}
        />
      </div>
    </>

  )
}

export default App