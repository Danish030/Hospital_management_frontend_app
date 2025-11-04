
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import Card from './component/Card'
import HospitalDashboard from './component/HospitalDashboard'
import RegistrationForm from './component/RegistrationForm'
import AdminLogin from './component/adminLogin'
import OpdTokenDashboard from './component/OpdTokenDashboard'
import BedManagement from './component/BedManagement'
import AdminDashboardLayout from './component/AdminDashboardLayout'
import BookBed from './component/BookBed'
import Chatbot from './component/ChatBot'

function App() {


  return (
    <>
      <Chatbot />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
        <Route path="/register-patient" element={<RegistrationForm />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/book-bed/:hospitalName/:bedNumber" element={<BookBed />} />
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="opd-token" element={<OpdTokenDashboard />} />
          <Route path="bed-management" element={<BedManagement />} />
        </Route>
         
      </Routes>
    </>
  )
}

export default App
