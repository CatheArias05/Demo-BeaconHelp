import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Users, Settings, Plus, Edit, Trash2, Eye, MoreVertical } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingAIWidget from '../../components/FloatingAIWidget'
import CustomAlert from '../../components/CustomAlert'
import Footer from '../../components/Footer'
import BackgroundParticles from '../../components/BackgroundParticles'
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

  // Estados para modales y menús
  const [errors, setErrors] = useState({})
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  // Estados para modales eliminados - ya no se necesitan showDeleteConfirm y contactToDelete
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  })
  
  const dropdownRef = useRef(null)

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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Cerrar modales con la tecla Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeModals()
      }
    }

    if (showEditModal || showDetailsModal) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [showEditModal, showDetailsModal])

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
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
    
    const isEditing = editingContact !== null
    
    if (isEditing) {
      // Actualizar contacto existente
      setEmergencyContacts(prev => 
        prev.map(contact => 
          contact.id === editingContact.id 
            ? { 
                ...contact, 
                name: formData.name.trim(), 
                relation: formData.relation, 
                phone: formData.phone.trim() 
              }
            : contact
        )
      )
      
      // Cerrar modal y limpiar estado de edición
      setShowEditModal(false)
      setEditingContact(null)
    } else {
      // Crear nuevo contacto
      const newContact = {
        id: Date.now(),
        name: formData.name.trim(),
        relation: formData.relation,
        phone: formData.phone.trim(),
        avatar: null
      }
      
      setEmergencyContacts(prev => [...prev, newContact])
    }
    
    // Limpiar el formulario
    setFormData({
      name: '',
      relation: '',
      phone: ''
    })
    
    // Limpiar errores
    setErrors({})
    
    // Mostrar mensaje de éxito
    setAlert({
      isVisible: true,
      type: 'success',
      title: '¡Éxito!',
      message: isEditing ? 'Contacto actualizado correctamente' : 'Contacto agregado correctamente'
    })
  }

  // Función para abrir el menú desplegable
  const toggleDropdown = (contactId) => {
    setActiveDropdown(activeDropdown === contactId ? null : contactId)
  }

  // Función para editar contacto
  const handleEditContact = (contact) => {
    if (!contact) {
      console.error('No contact provided to handleEditContact')
      return
    }
    
    // Cerrar cualquier dropdown activo
    setActiveDropdown(null)
    
    // Limpiar errores previos
    setErrors({})
    
    // Establecer el contacto que se está editando
    setEditingContact(contact)
    
    // Cargar los datos del contacto en el formulario
    setFormData({
      name: contact.name || '',
      relation: contact.relation || '',
      phone: contact.phone || ''
    })
    
    // Mostrar el modal de edición
    setShowEditModal(true)
  }

  // Función para eliminar contacto
  const handleDeleteContact = (contact) => {
    setAlert({
      isVisible: true,
      type: 'confirm',
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar a ${contact.name} de tus contactos de emergencia?`,
      onConfirm: () => {
        setEmergencyContacts(prev => prev.filter(c => c.id !== contact.id))
        setAlert({
          isVisible: true,
          type: 'success',
          title: 'Contacto eliminado',
          message: `${contact.name} ha sido eliminado de tus contactos`
        })
      },
      onCancel: closeAlert
    })
    setActiveDropdown(null)
  }

  // Función para ver detalles
  const handleViewDetails = (contact) => {
    setSelectedContact(contact)
    setShowDetailsModal(true)
    setActiveDropdown(null)
  }

  // Cerrar modales - FUNCIÓN MEJORADA
  const closeModals = () => {
    // Guardar el estado actual antes de limpiarlo
    const wasEditing = editingContact !== null
    
    setShowEditModal(false)
    setShowDetailsModal(false)
    setEditingContact(null)
    setSelectedContact(null)
    setActiveDropdown(null)
    
    // Solo resetear el formulario si no estábamos editando
    if (!wasEditing) {
      setFormData({ name: '', relation: '', phone: '' })
    }
    setErrors({})
  }

  // Función para manejar click en overlay
  const handleOverlayClick = (e) => {
    // Solo cerrar si el click fue directamente en el overlay, no en sus hijos
    if (e.target === e.currentTarget) {
      if (showEditModal || showDetailsModal) {
        closeModals()
      } else {
        setIsMenuOpen(false)
      }
    }
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

      {/* Overlay - CORREGIDO */}
      {isMenuOpen && (
        <div className="contacts-overlay" onClick={handleOverlayClick} />
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

        {/* Mensaje de éxito ahora manejado por CustomAlert */}

        {/* Add Contact Section */}
        {!showEditModal && (
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
        )}

        {/* Edit Contact Modal - REDISEÑADO */}
        {showEditModal && editingContact && (
          <div className="edit-modal-overlay" onClick={handleOverlayClick}>
            <div className="edit-modal-container" onClick={(e) => e.stopPropagation()}>
              {/* Header del Modal */}
              <div className="edit-modal-header">
                <div className="edit-modal-title-section">
                  <div className="edit-modal-icon-wrapper">
                    <Edit className="edit-modal-icon" />
                  </div>
                  <div>
                    <h2 className="edit-modal-title">Editar Contacto</h2>
                    <p className="edit-modal-subtitle">Modifica la información del contacto</p>
                  </div>
                </div>
                <button className="edit-modal-close-btn" onClick={closeModals}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="edit-modal-body">
                <form className="edit-modal-form" onSubmit={handleSubmit}>
                  {/* Campo Nombre */}
                  <div className="edit-form-field">
                    <label className="edit-form-label">
                      <Users className="edit-form-label-icon" />
                      Nombre completo
                    </label>
                    <div className="edit-form-input-wrapper">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`edit-form-input ${errors.name ? 'edit-form-input-error' : ''}`}
                        placeholder="Ej: María González"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <div className="edit-form-error">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Campo Relación */}
                  <div className="edit-form-field">
                    <label className="edit-form-label">
                      <Settings className="edit-form-label-icon" />
                      Relación
                    </label>
                    <div className="edit-form-input-wrapper">
                      <select 
                        name="relation"
                        value={formData.relation}
                        onChange={handleInputChange}
                        className={`edit-form-select ${errors.relation ? 'edit-form-input-error' : ''}`}
                      >
                        <option value="">Seleccionar relación...</option>
                        <option value="Familia">👨‍👩‍👧‍👦 Familia</option>
                        <option value="Amigo/a">👫 Amigo/a</option>
                        <option value="Vecino/a">🏠 Vecino/a</option>
                        <option value="Colega">💼 Colega</option>
                        <option value="Otro">🤝 Otro</option>
                      </select>
                      {errors.relation && (
                        <div className="edit-form-error">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          {errors.relation}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Campo Teléfono */}
                  <div className="edit-form-field">
                    <label className="edit-form-label">
                      <Phone className="edit-form-label-icon" />
                      Número de teléfono
                    </label>
                    <div className="edit-form-input-wrapper">
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`edit-form-input ${errors.phone ? 'edit-form-input-error' : ''}`}
                        placeholder="+57 300 123 4567"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <div className="edit-form-error">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="edit-modal-actions">
                    <button type="button" className="edit-cancel-btn" onClick={closeModals}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancelar
                    </button>
                    <button type="submit" className="edit-save-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17,21 17,13 7,13 7,21"></polyline>
                        <polyline points="7,3 7,8 15,8"></polyline>
                      </svg>
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal - CORREGIDO */}
        {showDetailsModal && selectedContact && (
          <div className="contacts-modal" onClick={handleOverlayClick}>
            <div className="contacts-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="contacts-modal-header">
                <h3 className="contacts-modal-title">
                  <Eye className="contacts-modal-icon" />
                  Detalles del Contacto
                </h3>
                <button className="contacts-modal-close" onClick={closeModals}>
                  ×
                </button>
              </div>
              
              <div className="contacts-details">
                <div className="contacts-details-avatar">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="contacts-details-info">
                  <div className="contacts-detail-item">
                    <label>Nombre completo:</label>
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="contacts-detail-item">
                    <label>Relación:</label>
                    <span>{selectedContact.relation}</span>
                  </div>
                  <div className="contacts-detail-item">
                    <label>Teléfono:</label>
                    <span>{selectedContact.phone}</span>
                  </div>
                  <div className="contacts-detail-item">
                    <label>Agregado:</label>
                    <span>Hace 2 semanas</span>
                  </div>
                </div>
              </div>
              
              <div className="contacts-modal-actions">
                <button className="contacts-cancel-btn" onClick={closeModals}>
                  Cerrar
                </button>
                <button className="contacts-call-btn" onClick={() => handlePhoneCall(selectedContact)}>
                  <Phone className="contacts-call-icon" />
                  Llamar
                </button>
              </div>
            </div>
          </div>
        )}



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
                    <button className="contacts-action-btn contacts-call-btn" onClick={() => handlePhoneCall(contact)}>
                      <Phone className="contacts-action-icon" />
                    </button>
                    <div className="contacts-dropdown" ref={activeDropdown === contact.id ? dropdownRef : null}>
                      <button 
                        className="contacts-action-btn contacts-settings-btn" 
                        onClick={() => toggleDropdown(contact.id)}
                      >
                        <Settings className="contacts-action-icon" />
                      </button>
                      {activeDropdown === contact.id && (
                        <div className="contacts-dropdown-menu">
                          <button 
                            className="contacts-dropdown-item"
                            onClick={() => handleEditContact(contact)}
                          >
                            <Edit className="contacts-dropdown-icon" />
                            Modificar contacto
                          </button>
                          <button 
                            className="contacts-dropdown-item"
                            onClick={() => handleViewDetails(contact)}
                          >
                            <Eye className="contacts-dropdown-icon" />
                            Ver detalles
                          </button>
                          <button 
                            className="contacts-dropdown-item contacts-dropdown-delete"
                            onClick={() => handleDeleteContact(contact)}
                          >
                            <Trash2 className="contacts-dropdown-icon" />
                            Eliminar contacto
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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

      {/* Background Particles */}
      <BackgroundParticles />

      {/* Floating AI Widget */}
      <FloatingAIWidget isOpen={isAIOpen} setIsOpen={setIsAIOpen} />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
