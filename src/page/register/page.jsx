import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import CustomAlert from '../../components/CustomAlert'
import Footer from '../../components/Footer'
import '../../styles/Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register data:', formData)
    setAlert({
      isVisible: true,
      type: 'success',
      title: '¡Registro Exitoso!',
      message: 'Bienvenido a BeaconHelp. Tu cuenta ha sido creada exitosamente.'
    })
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft className="back-icon" />
          </button>
          
          <div className="register-logo">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="register-logo-img" />
            <h1 className="register-app-title">BeaconHelp</h1>
          </div>
          <h2 className="register-title">Crear Cuenta</h2>
          <p className="register-subtitle">Únete a nuestra comunidad de seguridad</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <div className="input-container">
              <User className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Tu nombre completo"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="tu@ejemplo.com"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label className="form-label">Teléfono</label>
            <div className="input-container">
              <Phone className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="+57 300 123 4567"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input password-input"
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Crear Cuenta
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p className="footer-text">
            ¿Ya tienes cuenta?{' '}
            <button className="login-link" onClick={() => navigate('/')}>
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
      
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />
      
      <Footer />
    </div>
  )
}

export default Register