import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Users, Settings, Plus, Edit, Trash2, Eye, MoreVertical } from 'lucide-react'
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

  // Estados para modales y menús
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  
  const dropdownRef = useRef(null)

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

    if (showEditModal || showDetailsModal || showDeleteConfirm) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [showEditModal, showDetailsModal, showDeleteConfirm])

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
    
    if (editingContact) {
      // Actualizar contacto existente
      setEmergencyContacts(prev => 
        prev.map(contact => 
          contact.id === editingContact.id 
            ? { ...contact, name: formData.name.trim(), relation: formData.relation, phone: formData.phone.trim() }
            : contact
        )
      )
      setEditingContact(null)
      setShowEditModal(false)
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
    
    // Mostrar mensaje de éxito
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Función para abrir el menú desplegable
  const toggleDropdown = (contactId) => {
    setActiveDropdown(activeDropdown === contactId ? null : contactId)
  }

  // Función para editar contacto
  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      relation: contact.relation,
      phone: contact.phone
    })
    setShowEditModal(true)
    setActiveDropdown(null)
  }

  // Función para eliminar contacto
  const handleDeleteContact = (contact) => {
    setContactToDelete(contact)
    setShowDeleteConfirm(true)
    setActiveDropdown(null)
  }

  // Confirmar eliminación
  const confirmDelete = () => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== contactToDelete.id))
    setShowDeleteConfirm(false)
    setContactToDelete(null)
  }

  // Función para ver detalles
  const handleViewDetails = (contact) => {
    setSelectedContact(contact)
    setShowDetailsModal(true)
    setActiveDropdown(null)
  }

  // Cerrar modales - FUNCIÓN MEJORADA
  const closeModals = () => {
    setShowEditModal(false)
    setShowDetailsModal(false)
    setShowDeleteConfirm(false)
    setEditingContact(null)
    setSelectedContact(null)
    setContactToDelete(null)
    setActiveDropdown(null)
    
    // Solo resetear el formulario si no estamos editando
    if (!editingContact) {
      setFormData({ name: '', relation: '', phone: '' })
    }
    setErrors({})
  }

  // Función para manejar click en overlay
  const handleOverlayClick = (e) => {
    // Solo cerrar si el click fue directamente en el overlay, no en sus hijos
    if (e.target === e.currentTarget) {
      if (showEditModal || showDetailsModal || showDeleteConfirm) {
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
      {(isMenuOpen || showEditModal || showDetailsModal || showDeleteConfirm) && (
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

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="contacts-success-message">
            ✅ {editingContact ? 'Contacto actualizado' : 'Contacto agregado'} exitosamente
          </div>
        )}

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

        {/* Edit Contact Modal - CORREGIDO */}
        {showEditModal && (
          <div className="contacts-modal" onClick={handleOverlayClick}>
            <div className="contacts-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="contacts-modal-header">
                <h3 className="contacts-modal-title">
                  <Edit className="contacts-modal-icon" />
                  Editar Contacto
                </h3>
                <button className="contacts-modal-close" onClick={closeModals}>
                  ×
                </button>
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
                
                <div className="contacts-modal-actions">
                  <button type="button" className="contacts-cancel-btn" onClick={closeModals}>
                    Cancelar
                  </button>
                  <button type="submit" className="contacts-save-btn">
                    <Edit className="contacts-save-btn-icon" />
                    Guardar Cambios
                  </button>
                </div>
              </form>
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
                <button className="contacts-call-btn" onClick={() => window.open(`tel:${selectedContact.phone}`)}>
                  <Phone className="contacts-call-icon" />
                  Llamar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal - CORREGIDO */}
        {showDeleteConfirm && contactToDelete && (
          <div className="contacts-modal" onClick={handleOverlayClick}>
            <div className="contacts-modal-content contacts-delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="contacts-modal-header">
                <h3 className="contacts-modal-title contacts-delete-title">
                  <Trash2 className="contacts-modal-icon contacts-delete-icon" />
                  Eliminar Contacto
                </h3>
                <button className="contacts-modal-close" onClick={closeModals}>
                  ×
                </button>
              </div>
              
              <div className="contacts-delete-content">
                <p>¿Estás seguro de que deseas eliminar a <strong>{contactToDelete.name}</strong> de tus contactos de emergencia?</p>
                <p className="contacts-delete-warning">Esta acción no se puede deshacer.</p>
              </div>
              
              <div className="contacts-modal-actions">
                <button className="contacts-cancel-btn" onClick={closeModals}>
                  Cancelar
                </button>
                <button className="contacts-delete-btn" onClick={confirmDelete}>
                  <Trash2 className="contacts-delete-btn-icon" />
                  Eliminar
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
                    <button className="contacts-action-btn contacts-call-btn" onClick={() => window.open(`tel:${contact.phone}`)}>
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

      {/* Floating AI Widget */}
      <FloatingAIWidget isOpen={isAIOpen} setIsOpen={setIsAIOpen} />
    </div>
  )
}
