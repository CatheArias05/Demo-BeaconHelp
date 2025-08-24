import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './page/home/page'
import ContactsPage from './page/contacts/page'
import ResourcesPage from './page/resources/page'
import EducationPage from './page/education/page'
import ReportsPage from './page/reports/page'
import LocationPage from './page/location/page'
import SettingsPage from './page/settings/page'
import Register from './page/register/page'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App