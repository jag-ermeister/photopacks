import React from 'react'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withAuthenticatedLayout from './components/hoc/withAuthenticatedLayout'
import withUnauthenticatedLayout from './components/hoc/withUnauthenticatedLayout'
import BrowsePacks from './pages/BrowsePacks'
import BrowseOrders from './pages/BrowseOrders'
import PackDetails from './pages/PackDetails'
import OrderDetails from './pages/OrderDetails'
import Purchase from './pages/Purchase'
import Upload from './pages/Upload'

function App() {
  const LandingWithoutAuth = withUnauthenticatedLayout(Landing)
  const HomeWithAuth = withAuthenticatedLayout(Home)

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingWithoutAuth />} />
          <Route path="/home" element={<HomeWithAuth />} />
          <Route path="/packs" element={<BrowsePacks />} />
          <Route path="/packs/:id" element={<PackDetails />} />
          <Route path="/orders" element={<BrowseOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
