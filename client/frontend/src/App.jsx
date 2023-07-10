import { useState } from 'react'
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import MainPage from './routes/MainPage'
import {ReservationProvider} from './model/reservationContext'
import './App.css'

function App() {
  
  return (
    <Router>
      <ReservationProvider>
      <div className="app">
        <Routes>
          <Route exact path='/' element={<MainPage></MainPage>}/>
        </Routes>
      </div>
      </ReservationProvider>
    </Router>
  )
}

export default App
