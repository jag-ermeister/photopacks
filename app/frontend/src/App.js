import React from 'react'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withAuthenticatedLayout from './components/hoc/withAuthenticatedLayout'
import withUnauthenticatedLayout from './components/hoc/withUnauthenticatedLayout'

function App() {
  const LandingWithoutAuth = withUnauthenticatedLayout(Landing)
  const HomeWithAuth = withAuthenticatedLayout(Home)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingWithoutAuth />} />
          <Route path="/home" element={<HomeWithAuth />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
