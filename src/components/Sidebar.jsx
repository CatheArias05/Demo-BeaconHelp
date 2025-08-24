import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Users, BookOpen, FileText, MapPin, Settings, GraduationCap, X } from 'lucide-react'
import '../styles/Sidebar.css'

const Sidebar = ({ isMenuOpen, setIsMenuOpen, currentPage }) => {
  const navigate = useNavigate()

  const menuItems = [
    { icon: Shield, label: "Inicio", path: "/", key: "home" },
    { icon: Users, label: "Contactos de Emergencia", path: "/contacts", key: "contacts" },
    { icon: GraduationCap, label: "Educación", path: "/education", key: "education" },
    { icon: BookOpen, label: "Recursos de Apoyo", path: "/resources", key: "resources" },
    { icon: FileText, label: "Mis Reportes", path: "/reports", key: "reports" },
    { icon: MapPin, label: "Mi Ubicación", path: "/location", key: "location" },
    { icon: Settings, label: "Configuración", path: "/settings", key: "settings" },
  ]

  return (
    <div className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="sidebar-logo-img" />
            <div className="sidebar-logo-text">
              <h1 className="sidebar-title">BeaconHelp</h1>
              <p className="sidebar-subtitle">Denuncia sin miedo, te acompañamos</p>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setIsMenuOpen(false)}>
            <X className="close-icon" />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${currentPage === item.key ? 'nav-item-active' : ''}`}
              onClick={() => {
                navigate(item.path)
                setIsMenuOpen(false)
              }}
            >
              <item.icon className="nav-icon" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar