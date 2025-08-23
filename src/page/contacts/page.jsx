import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Users, Settings, Plus } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingAIWidget from '../../components/FloatingAIWidget'
import '../../styles/Contacts.css'

export default function ContactsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const navigate = useNavigate()

  // Estado para los contactos de emergencia
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "María González", relation: "Hermana", phone: "+57 300 123 4567", avatar: "/woman-avatar.png" },
    { id: 2, name: "Carlos Rodríguez", relation: "Amigo", phone: "+57 301 987 6543", avatar: "/man-avatar.png" },
    { id: 3, name: "Ana López", relation: "Vecina", phone: "+57 302 456 7890", avatar: "/woman-avatar-2.png" },
  ])

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    phone: ''
  })

  // Estado para mensajes de feedback
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.relation) {
      newErrors.relation = 'La relación es requerida'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^\+?[0-9\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Crear nuevo contacto
    const newContact = {
      id: Date.now(), // ID único basado en timestamp
      name: formData.name.trim(),
      relation: formData.relation,
      phone: formData.phone.trim(),
      avatar: null
    }
    
    // Agregar el nuevo contacto a la lista
    setEmergencyContacts(prev => [...prev, newContact])
    
    // Limpiar el formulario
    setFormData({
      name: '',
      relation: '',
      phone: ''
    })
    
    // Mostrar mensaje de éxito
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="contacts-container">
      {/* Background with floating icons */}
      <div className="contacts-background">
        <div className="contacts-floating-icons">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="contacts-floating-icon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Users className="contacts-users-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="contacts" 
      />

      {/* Overlay */}
      {isMenuOpen && (
        <div className="contacts-overlay" onClick={() => setIsMenuOpen(false)} />
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
      <div className="contacts-main-content">
        <div className="contacts-header">
          <div className="contacts-logo-section">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="contacts-logo" />
          </div>
          <h2 className="contacts-title">Contactos de Emergencia</h2>
          <p className="contacts-subtitle">Personas que serán notificadas en caso de emergencia</p>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="contacts-success-message">
            ✅ Contacto agregado exitosamente
          </div>
        )}

        {/* Add Contact Section */}
        <div className="contacts-add-section">
          <div className="contacts-add-header">
            <h3 className="contacts-add-title">
              <Plus className="contacts-add-icon" />
              Agregar Contacto
            </h3>
            <p className="contacts-add-description">
              Añade personas de confianza que puedan ayudarte en emergencias
            </p>
          </div>
          
          <form className="contacts-form" onSubmit={handleSubmit}>
            <div className="contacts-form-row">
              <div className="contacts-form-group">
                <label className="contacts-form-label">Nombre completo</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`contacts-form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Ej: María González"
                />
                {errors.name && <span className="contacts-error">{errors.name}</span>}
              </div>
              <div className="contacts-form-group">
                <label className="contacts-form-label">Relación</label>
                <select 
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  className={`contacts-form-select ${errors.relation ? 'error' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Familia">Familia</option>
                  <option value="Amigo/a">Amigo/a</option>
                  <option value="Vecino/a">Vecino/a</option>
                  <option value="Colega">Colega</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.relation && <span className="contacts-error">{errors.relation}</span>}
              </div>
            </div>
            
            <div className="contacts-form-group">
              <label className="contacts-form-label">Número de teléfono</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`contacts-form-input ${errors.phone ? 'error' : ''}`}
                placeholder="+57 300 123 4567"
              />
              {errors.phone && <span className="contacts-error">{errors.phone}</span>}
            </div>
            
            <button type="submit" className="contacts-add-btn">
              <Plus className="contacts-add-btn-icon" />
              Agregar Contacto
            </button>
          </form>
        </div>

        {/* Contacts List Section */}
        <div className="contacts-list-section">
          <div className="contacts-list-header">
            <h3 className="contacts-list-title">
              <Users className="contacts-list-icon" />
              Mis Contactos de Emergencia
            </h3>
            <p className="contacts-list-description">
              {emergencyContacts.length} contacto{emergencyContacts.length !== 1 ? 's' : ''} configurado{emergencyContacts.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="contacts-list">
            {emergencyContacts.length === 0 ? (
              <div className="contacts-empty">
                <Users className="contacts-empty-icon" />
                <h4 className="contacts-empty-title">No hay contactos aún</h4>
                <p className="contacts-empty-description">
                  Agrega tu primer contacto de emergencia usando el formulario de arriba
                </p>
              </div>
            ) : (
              emergencyContacts.map((contact) => (
                <div key={contact.id} className="contacts-item">
                  <div className="contacts-item-info">
                    <div className="contacts-item-avatar">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="contacts-item-details">
                      <p className="contacts-item-name">{contact.name}</p>
                      <p className="contacts-item-relation">{contact.relation}</p>
                      <p className="contacts-item-phone">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="contacts-item-actions">
                    <button className="contacts-action-btn contacts-call-btn">
                      <Phone className="contacts-action-icon" />
                    </button>
                    <button className="contacts-action-btn">
                      <Settings className="contacts-action-icon" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating AI Widget */}
      <FloatingAIWidget isOpen={isAIOpen} setIsOpen={setIsAIOpen} />
    </div>
  )
}
