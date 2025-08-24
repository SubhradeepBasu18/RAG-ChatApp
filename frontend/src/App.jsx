import './App.css'
import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Notebook from "./pages/Notebook"

function App() {

  return (
    <div className="min-h-screen overflow-x-hidden">
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/notebook" element={<Notebook />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
