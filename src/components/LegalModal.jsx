import React from 'react';
import '../styles/LegalModal.css';

const LegalModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const getContent = () => {
    if (type === 'privacy') {
      return {
        title: 'Política de Privacidad',
        content: (
          <div className="legal-content">
            <h3>1. Información que Recopilamos</h3>
            <p>En BeaconHelp, recopilamos únicamente la información necesaria para brindar nuestros servicios de seguridad ciudadana:</p>
            <ul>
              <li>Información de contacto (nombre, teléfono, email)</li>
              <li>Ubicación geográfica para servicios de emergencia</li>
              <li>Reportes y denuncias realizadas a través de la plataforma</li>
            </ul>

            <h3>2. Uso de la Información</h3>
            <p>Utilizamos su información para:</p>
            <ul>
              <li>Proporcionar servicios de emergencia y seguridad</li>
              <li>Conectar con autoridades competentes cuando sea necesario</li>
              <li>Mejorar nuestros servicios y funcionalidades</li>
              <li>Enviar notificaciones importantes sobre seguridad</li>
            </ul>

            <h3>3. Protección de Datos</h3>
            <p>Implementamos medidas de seguridad robustas para proteger su información personal. Sus datos están encriptados y almacenados de forma segura.</p>

            <h3>4. Compartir Información</h3>
            <p>Solo compartimos información con autoridades competentes en casos de emergencia o cuando sea requerido por ley para garantizar la seguridad ciudadana.</p>

            <h3>5. Sus Derechos</h3>
            <p>Usted tiene derecho a acceder, corregir o eliminar su información personal. Contáctenos para ejercer estos derechos.</p>

            <h3>6. Contacto</h3>
            <p>Para consultas sobre privacidad, contáctenos en: privacy@beaconhelp.com</p>
          </div>
        )
      };
    } else if (type === 'terms') {
      return {
        title: 'Términos y Condiciones',
        content: (
          <div className="legal-content">
            <h3>1. Aceptación de Términos</h3>
            <p>Al utilizar BeaconHelp, usted acepta estos términos y condiciones en su totalidad.</p>

            <h3>2. Descripción del Servicio</h3>
            <p>BeaconHelp es una plataforma de seguridad ciudadana que permite:</p>
            <ul>
              <li>Realizar reportes y denuncias de forma segura</li>
              <li>Acceder a servicios de emergencia</li>
              <li>Conectar con recursos de apoyo y autoridades</li>
              <li>Recibir asistencia en situaciones de riesgo</li>
            </ul>

            <h3>3. Responsabilidades del Usuario</h3>
            <p>El usuario se compromete a:</p>
            <ul>
              <li>Proporcionar información veraz y precisa</li>
              <li>Usar el servicio de manera responsable</li>
              <li>No realizar reportes falsos o maliciosos</li>
              <li>Respetar las leyes locales y nacionales</li>
            </ul>

            <h3>4. Limitaciones de Responsabilidad</h3>
            <p>BeaconHelp actúa como intermediario entre usuarios y servicios de emergencia. No somos responsables por:</p>
            <ul>
              <li>Tiempos de respuesta de autoridades</li>
              <li>Disponibilidad de servicios de terceros</li>
              <li>Resultados específicos de intervenciones</li>
            </ul>

            <h3>5. Modificaciones</h3>
            <p>Nos reservamos el derecho de modificar estos términos. Los cambios serán notificados a través de la plataforma.</p>

            <h3>6. Contacto Legal</h3>
            <p>Para asuntos legales, contáctenos en: legal@beaconhelp.com</p>
          </div>
        )
      };
    }
    return { title: '', content: null };
  };

  const { title, content } = getContent();

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2 className="legal-modal-title">{title}</h2>
          <button className="legal-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="legal-modal-body">
          {content}
        </div>
        <div className="legal-modal-footer">
          <button className="legal-modal-button" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;