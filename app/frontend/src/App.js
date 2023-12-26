import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BrowsePacks from './pages/BrowsePacks'
import BrowseOrders from './pages/BrowseOrders'
import PackDetails from './pages/PackDetails'
import OrderDetails from './pages/OrderDetails'
import Confirmation from './pages/Confirmation'
import Upload from './pages/Upload'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/packs" element={<BrowsePacks />} />
          <Route path="/packs/:id" element={<PackDetails />} />
          <Route path="/orders" element={<BrowseOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/upload/:id" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
