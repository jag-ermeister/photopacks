import React, {useEffect} from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BrowsePacks from './pages/BrowsePacks'
import BrowseOrders from './pages/BrowseOrders'
import PackDetails from './pages/PackDetails'
import OrderDetails from './pages/OrderDetails'
import Confirmation from './pages/Confirmation'
import Upload from './pages/Upload'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import ReactGA from 'react-ga';

function App() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/packs" element={<BrowsePacks />} />
          <Route path="/packs/:id" element={<PackDetails />} />
          <Route path="/orders" element={<BrowseOrders />} />
          <Route
            path="/orders/:orderId/packs/:packId"
            element={<OrderDetails />}
          />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/upload/:id" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
