import React from 'react'
import { CheckCircle, AlertTriangle, X, HelpCircle } from 'lucide-react'
import '../styles/CustomAlert.css'

const CustomAlert = ({ 
  isVisible, 
  type, 
  title, 
  message, 
  onClose, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar', 
  autoClose = true 
}) => {
  React.useEffect(() => {
    if (isVisible && autoClose && type !== 'confirm') {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, autoClose, type])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="alert-icon success-icon" />
      case 'warning':
        return <AlertTriangle className="alert-icon warning-icon" />
      case 'confirm':
        return <HelpCircle className="alert-icon confirm-icon" />
      default:
        return <CheckCircle className="alert-icon success-icon" />
    }
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    if (onClose) onClose()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    if (onClose) onClose()
  }

  return (
    <div className="custom-alert-overlay">
      <div className={`custom-alert ${type}`}>
        <div className="alert-content">
          <div className="alert-header">
            {getIcon()}
            <h3 className="alert-title">{title}</h3>
            {type !== 'confirm' && (
              <button className="alert-close-btn" onClick={onClose}>
                <X className="close-icon" />
              </button>
            )}
          </div>
          <p className="alert-message">{message}</p>
          {type === 'confirm' && (
            <div className="alert-actions">
              <button className="alert-btn alert-cancel-btn" onClick={handleCancel}>
                {cancelText}
              </button>
              <button className="alert-btn alert-confirm-btn" onClick={handleConfirm}>
                {confirmText}
              </button>
            </div>
          )}
        </div>
        {type !== 'confirm' && (
          <div className="alert-progress-bar">
            <div className="progress-fill"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomAlert