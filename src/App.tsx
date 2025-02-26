
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Parkings from "./pages/Parkings"
import ParkingSpaces from "./pages/ParkingSpaces"
import Complaints from "./pages/Complaints"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parkings" element={<Parkings />} />
        <Route path="/parking-spaces" element={<ParkingSpaces />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
