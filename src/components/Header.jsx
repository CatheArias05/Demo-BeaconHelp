import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, User, Settings, LogOut, Plus } from 'lucide-react'
import '../styles/Header.css'

const Header = ({ isMenuOpen, setIsMenuOpen, isUserMenuOpen, setIsUserMenuOpen, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="menu-icon" />
      </button>

      <div className="user-menu-container">
        <button className="user-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <div className="user-avatar">
            <User className="user-icon" />
          </div>
        </button>

        {isUserMenuOpen && (
          <div className="user-dropdown">
            {isLoggedIn ? (
              <>
                <div className="user-info">
                  <p className="user-name">Usuario Conectado</p>
                  <p className="user-email">usuario@ejemplo.com</p>
                </div>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/settings')
                    setIsUserMenuOpen(false)
                  }}
                >
                  <Settings className="dropdown-icon" />
                  Configuración
                </button>
                <button
                  className="dropdown-item logout-btn"
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsUserMenuOpen(false)
                  }}
                >
                  <LogOut className="dropdown-icon" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsLoggedIn(true)
                    setIsUserMenuOpen(false)
                  }}
                >
                  <User className="dropdown-icon" />
                  Iniciar Sesión
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/register')
                    setIsUserMenuOpen(false)
                  }}
                >
                  <Plus className="dropdown-icon" />
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header