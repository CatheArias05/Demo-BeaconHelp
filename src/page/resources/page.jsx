import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Heart, Shield, AlertTriangle } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingAIWidget from '../../components/FloatingAIWidget'
import Footer from '../../components/Footer'
import '../../styles/Resources.css'

export default function ResourcesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false)
  const navigate = useNavigate()

  const emergencyResources = [
    {
      title: "Línea Nacional",
      phone: "155",
      available: "24/7",
      description: "Línea especializada en atención y orientación para casos de emergencia y apoyo psicológico.",
      category: "emergency"
    },
    {
      title: "Policía Nacional",
      phone: "123",
      available: "24/7",
      description: "Servicio de emergencias policiales para situaciones de seguridad ciudadana.",
      category: "emergency"
    },
    {
      title: "Bomberos",
      phone: "119",
      available: "24/7",
      description: "Atención de emergencias relacionadas con incendios y rescates.",
      category: "emergency"
    },
    {
      title: "Cruz Roja",
      phone: "132",
      available: "24/7",
      description: "Servicios médicos de emergencia y primeros auxilios.",
      category: "emergency"
    }
  ]

  const supportResources = [
    {
      title: "Línea Mujer",
      phone: "155",
      available: "24/7",
      description: "Atención especializada para casos de violencia de género.",
      category: "support"
    },
    {
      title: "Línea de la Vida",
      phone: "106",
      available: "24/7",
      description: "Apoyo psicológico y prevención del suicidio.",
      category: "support"
    },
    {
      title: "ICBF",
      phone: "141",
      available: "24/7",
      description: "Protección de derechos de niños, niñas y adolescentes.",
      category: "support"
    }
  ]

  const legalResources = [
    {
      title: "Fiscalía General",
      phone: "122",
      available: "24/7",
      description: "Denuncias penales y investigación de delitos.",
      category: "legal"
    },
    {
      title: "Defensoría del Pueblo",
      phone: "018000914814",
      available: "Lun-Vie 8AM-5PM",
      description: "Protección y promoción de derechos humanos.",
      category: "legal"
    }
  ]

  return (
    <div className="resources-container">
      {/* Background with floating icons */}
      <div className="resources-background">
        <div className="resources-floating-icons">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="resources-floating-icon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Heart className="resources-heart-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="resources" 
      />

      {/* Overlay */}
      {isMenuOpen && (
        <div className="resources-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Header */}
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content */}
      <div className="resources-main-content">
        <div className="resources-header">
          <div className="resources-logo-section">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="resources-logo" />
          </div>
          <h2 className="resources-title">Recursos de Apoyo</h2>
          <p className="resources-subtitle">Líneas de ayuda y apoyo disponibles 24/7</p>
        </div>

        {/* Emergency Resources */}
        <div className="resources-emergency-section">
          <div className="resources-emergency-header">
            <h3 className="resources-emergency-title">
              <AlertTriangle className="resources-emergency-icon" />
              Líneas de Emergencia
            </h3>
            <p className="resources-emergency-description">
              Para situaciones de peligro inmediato
            </p>
          </div>
          
          <div className="resources-emergency-list">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="resources-emergency-item">
                <div className="resources-emergency-info">
                  <p className="resources-emergency-name">{resource.title}</p>
                  <div className="resources-emergency-details">
                    <span className="resources-emergency-phone">{resource.phone}</span>
                    <span className="resources-emergency-availability">{resource.available}</span>
                  </div>
                  <p className="resources-emergency-description">{resource.description}</p>
                </div>
                <button className="resources-emergency-call-btn">
                  <Phone className="resources-call-icon" />
                  Llamar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Resources */}
        <div className="resources-support-section">
          <div className="resources-support-header">
            <h3 className="resources-support-title">
              <Heart className="resources-support-icon" />
              Apoyo Psicológico
            </h3>
            <p className="resources-support-description">
              Líneas de apoyo emocional y psicológico
            </p>
          </div>
          
          <div className="resources-support-list">
            {supportResources.map((resource, index) => (
              <div key={index} className="resources-support-item">
                <div className="resources-support-info">
                  <p className="resources-support-name">{resource.title}</p>
                  <div className="resources-support-details">
                    <span className="resources-support-phone">{resource.phone}</span>
                    <span className="resources-support-availability">{resource.available}</span>
                  </div>
                  <p className="resources-support-description">{resource.description}</p>
                </div>
                <button className="resources-support-call-btn">
                  <Phone className="resources-call-icon" />
                  Llamar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Resources */}
        <div className="resources-legal-section">
          <div className="resources-legal-header">
            <h3 className="resources-legal-title">
              <Shield className="resources-legal-icon" />
              Asistencia Legal
            </h3>
            <p className="resources-legal-description">
              Orientación jurídica y denuncia de delitos
            </p>
          </div>
          
          <div className="resources-legal-list">
            {legalResources.map((resource, index) => (
              <div key={index} className="resources-legal-item">
                <div className="resources-legal-info">
                  <p className="resources-legal-name">{resource.title}</p>
                  <div className="resources-legal-details">
                    <span className="resources-legal-phone">{resource.phone}</span>
                    <span className="resources-legal-availability">{resource.available}</span>
                  </div>
                  <p className="resources-legal-description">{resource.description}</p>
                </div>
                <button className="resources-legal-call-btn">
                  <Phone className="resources-call-icon" />
                  Llamar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Widget */}
      <FloatingAIWidget isOpen={isAIWidgetOpen} setIsOpen={setIsAIWidgetOpen} />
      
      <Footer />
    </div>
  )
}
