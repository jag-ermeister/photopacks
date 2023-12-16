import React from 'react'
import Home from './components/Home'
import Landing from './components/Landing'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import withAuthenticatedLayout from './components/hoc/withAuthenticatedLayout'

function App() {
  const HomeWithAuth = withAuthenticatedLayout(Home)

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Landing</Link>
          <Link to="/home">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<HomeWithAuth />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
