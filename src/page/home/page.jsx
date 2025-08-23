import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingAIWidget from '../../components/FloatingAIWidget'
import CustomAlert from '../../components/CustomAlert'
import Footer from '../../components/Footer'
import { Shield, AlertTriangle, Users, Heart, Phone, PhoneCall, MessageCircle, MapPin } from 'lucide-react'
import '../../styles/Home.css'

const Home = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [isPanicActive, setIsPanicActive] = useState(false)
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false)
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  })

  const emergencyContacts = [
    { id: 1, name: "María González", relation: "Hermana", phone: "+57 300 123 4567" },
    { id: 2, name: "Carlos Rodríguez", relation: "Amigo", phone: "+57 301 987 6543" },
  ]

  const supportResources = [
    { title: "Línea Nacional", phone: "155", available: "24/7" },
    { title: "Policía Nacional", phone: "123", available: "24/7" },
  ]

  // Cerrar menú automáticamente al entrar al Home
  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Error getting location:", error)
        },
      )
    }
  }, [])

  const showAlert = (type, title, message) => {
    setAlert({
      isVisible: true,
      type,
      title,
      message
    })
  }

  // Función para cerrar alertas
  const closeAlert = () => {
    setAlert({
      isVisible: false,
      type: 'success',
      title: '',
      message: ''
    })
  }

  // Función para detectar si es dispositivo móvil
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  // Función para copiar número al portapapeles
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setAlert({
        isVisible: true,
        type: 'success',
        title: '¡Copiado!',
        message: `Número ${text} copiado al portapapeles`
      })
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setAlert({
        isVisible: true,
        type: 'success',
        title: '¡Copiado!',
        message: `Número ${text} copiado al portapapeles`
      })
    }
  }

  const handlePanicButton = () => {
    setIsPanicActive(true)
    setTimeout(() => {
      setIsPanicActive(false)
      showAlert(
        'success',
        '¡Alerta Enviada!',
        'Tu alerta de emergencia ha sido enviada exitosamente a tus contactos de emergencia y autoridades locales.'
      )
    }, 3000)
  }

  const handleEmergencyCall = () => {
    showAlert(
      'warning',
      'Llamada de Emergencia',
      'Iniciando llamada al 123 - Policía Nacional. Mantén la calma y proporciona tu ubicación.'
    )
    setTimeout(() => {
      window.location.href = 'tel:123'
    }, 2000)
  }

  const handleSupportChat = () => {
    showAlert(
      'success',
      'Chat de Apoyo',
      'Abriendo chat con nuestro asistente de IA. Estamos aquí para ayudarte.'
    )
    setTimeout(() => {
      setIsAIWidgetOpen(true)
    }, 1500)
  }

  // Función para manejar llamadas telefónicas
  const handlePhoneCall = (contact) => {
    if (isMobileDevice()) {
      // En dispositivos móviles, mostrar confirmación antes de llamar
      setAlert({
        isVisible: true,
        type: 'confirm',
        title: 'Llamar a contacto',
        message: `¿Deseas llamar a ${contact.name} al número ${contact.phone}?`,
        confirmText: 'Llamar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          window.open(`tel:${contact.phone}`)
          closeAlert()
        },
        onCancel: closeAlert
      })
    } else {
      // En PC, ofrecer opciones
      setAlert({
        isVisible: true,
        type: 'confirm',
        title: 'Opciones de contacto',
        message: `Contacto: ${contact.name}\nNúmero: ${contact.phone}\n\n¿Qué deseas hacer?`,
        confirmText: 'Copiar número',
        cancelText: 'Abrir teléfono',
        onConfirm: () => {
          copyToClipboard(contact.phone)
        },
        onCancel: () => {
          try {
            window.open(`tel:${contact.phone}`)
            closeAlert()
          } catch (error) {
            setAlert({
              isVisible: true,
              type: 'warning',
              title: 'No disponible',
              message: 'No se pudo abrir la aplicación de teléfono. El número ha sido copiado al portapapeles.'
            })
            copyToClipboard(contact.phone)
          }
        }
      })
    }
  }

  const handleContactCall = (phone) => {
    const contact = { name: 'Contacto', phone: phone }
    handlePhoneCall(contact)
  }

  const handleResourceCall = (phone) => {
    const contact = { name: 'Recurso', phone: phone }
    handlePhoneCall(contact)
  }



  return (
    <div className="home-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-icons">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="floating-icon" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}>
              <Shield className="shield-icon" />
            </div>
          ))}
        </div>
      </div>

      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="home"
      />

      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)} />}

      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Home Header */}
        <div className="home-header">
          <div className="logo-section">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="logo" />
            <h1 className="app-title">BeaconHelp</h1>
          </div>
          <p className="app-subtitle">Denuncia sin miedo, te acompañamos</p>
          {userLocation && (
            <div className="location-indicator">
              <MapPin className="location-icon" />
              <span>Ubicación detectada</span>
            </div>
          )}
        </div>

        {/* Panic Button */}
        <div className="panic-section">
          <button
            className={`panic-button ${isPanicActive ? 'panic-active' : ''}`}
            onClick={handlePanicButton}
            disabled={isPanicActive}
          >
            {isPanicActive ? (
              <div className="panic-content panic-sending">
                <AlertTriangle className="panic-icon" />
                Enviando Alerta...
              </div>
            ) : (
              <div className="panic-content">
                <AlertTriangle className="panic-icon" />
                <span className="panic-text">EMERGENCIA</span>
              </div>
            )}
          </button>
          <p className="panic-description">
            Presiona para enviar alerta inmediata a tus contactos y autoridades
          </p>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={handleEmergencyCall}>
            <PhoneCall className="action-icon" />
            <span>Llamar 123</span>
          </button>
          <button className="quick-action-btn" onClick={handleSupportChat}>
            <MessageCircle className="action-icon" />
            <span>Chat Apoyo</span>
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">
              <Users className="section-icon" />
              Contactos de Emergencia
            </h3>
            <p className="section-description">Personas que serán notificadas en caso de emergencia</p>
          </div>
          <div className="contacts-list">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <div className="contact-info">
                  <div className="contact-avatar">
                    {contact.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="contact-details">
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-relation">{contact.relation}</p>
                  </div>
                </div>
                <button className="contact-phone-btn" onClick={() => handleContactCall(contact.phone)}>
                  <Phone className="phone-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Resources */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">
              <Heart className="section-icon" />
              Recursos de Apoyo
            </h3>
            <p className="section-description">Líneas de ayuda y apoyo psicológico disponibles</p>
          </div>
          <div className="resources-list">
            {supportResources.map((resource, index) => (
              <div key={index} className="resource-item">
                <div className="resource-info">
                  <p className="resource-title">{resource.title}</p>
                  <div className="resource-details">
                    <span className="resource-phone">{resource.phone}</span>
                    <span className="resource-availability">{resource.available}</span>
                  </div>
                </div>
                <button className="resource-call-btn" onClick={() => handleResourceCall(resource.phone)}>
                  <Phone className="phone-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingAIWidget isOpen={isAIWidgetOpen} setIsOpen={setIsAIWidgetOpen} />

      {/* Custom Alert */}
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
        onConfirm={alert.onConfirm}
        onCancel={alert.onCancel}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
      />

      <Footer />
    </div>
  )
}

export default Home