import React, { useState } from 'react'
import LegalModal from './LegalModal'
import '../styles/Footer.css'

const Footer = () => {
  const [legalModal, setLegalModal] = useState({
    isOpen: false,
    type: null
  })

  const openLegalModal = (type) => {
    setLegalModal({
      isOpen: true,
      type
    })
  }

  const closeLegalModal = () => {
    setLegalModal({
      isOpen: false,
      type: null
    })
  }

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="footer-logo-img" />
            <span className="footer-logo-text">BeaconHelp</span>
          </div>
          <p className="footer-description">
            Denuncia sin miedo, te acompañamos en cada paso hacia la seguridad ciudadana.
          </p>
          <div className="footer-links">
            <span>© 2025 BeaconHelp</span>
            <span>•</span>
            <button 
              onClick={() => openLegalModal('privacy')} 
              className="footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Privacidad
            </button>
            <span>•</span>
            <button 
              onClick={() => openLegalModal('terms')} 
              className="footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Términos
            </button>
          </div>
        </div>
      </footer>
      
      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </>
  )
}

export default Footer