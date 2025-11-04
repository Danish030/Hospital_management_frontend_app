
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import Card from './component/Card'
import HospitalDashboard from './component/HospitalDashboard'
import RegistrationForm from './component/RegistrationForm'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
        <Route path="/register-patient" element={<RegistrationForm />} />

      </Routes>
    </>
  )
}

export default App
