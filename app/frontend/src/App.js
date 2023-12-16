import React from 'react'
import Home from './components/Home'
import Landing from './components/Landing'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Landing</Link>
          <Link to="/home">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
