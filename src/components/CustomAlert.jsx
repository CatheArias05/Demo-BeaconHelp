import React from 'react'
import { CheckCircle, AlertTriangle, X } from 'lucide-react'
import '../styles/CustomAlert.css'

const CustomAlert = ({ isVisible, type, title, message, onClose, autoClose = true }) => {
  React.useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, autoClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="alert-icon success-icon" />
      case 'warning':
        return <AlertTriangle className="alert-icon warning-icon" />
      default:
        return <CheckCircle className="alert-icon success-icon" />
    }
  }

  return (
    <div className="custom-alert-overlay">
      <div className={`custom-alert ${type}`}>
        <div className="alert-content">
          <div className="alert-header">
            {getIcon()}
            <h3 className="alert-title">{title}</h3>
            <button className="alert-close-btn" onClick={onClose}>
              <X className="close-icon" />
            </button>
          </div>
          <p className="alert-message">{message}</p>
        </div>
        <div className="alert-progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default CustomAlert