import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Shield, AlertTriangle, Heart, Phone } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import FloatingAIWidget from '../../components/FloatingAIWidget'
import CustomAlert from '../../components/CustomAlert'
import Footer from '../../components/Footer'
import BackgroundParticles from '../../components/BackgroundParticles'
import '../../styles/Education.css'

export default function EducationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false)
  const [alert, setAlert] = useState({ isVisible: false, type: '', title: '', message: '' })
  const navigate = useNavigate()

  // Función para detectar dispositivo móvil
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
  };

  // Función para copiar al portapapeles
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setAlert({
        isVisible: true,
        type: 'success',
        title: 'Número Copiado',
        message: `El número ${text} ha sido copiado al portapapeles exitosamente.`
      });
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
      setAlert({
        isVisible: true,
        type: 'error',
        title: 'Error',
        message: 'No se pudo copiar el número al portapapeles.'
      });
    }
  };

  // Función para llamar a un número
  const handleCall = (phoneNumber) => {
    if (isMobileDevice()) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      copyToClipboard(phoneNumber);
    }
  };

  // Función para manejar el clic en el overlay
  const handleOverlayClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="education-container">
      {/* Background with floating icons */}
      <div className="education-background">
        <div className="education-floating-icons">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="education-floating-icon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <BookOpen className="education-book-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="education" 
      />

      {/* Overlay */}
      {isMenuOpen && (
        <div className="education-overlay" onClick={handleOverlayClick} />
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
      <div className="education-main-content">
        <div className="education-header">
          <div className="education-logo-section">
            <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="education-logo" />
          </div>
          <h2 className="education-title">Educación y Prevención</h2>
          <p className="education-subtitle">Información importante para tu seguridad y bienestar</p>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">Tu Seguridad es Nuestra Prioridad</h2>
              <p className="hero-description">
                Aprende a identificar situaciones de riesgo, conoce tus derechos y descubre 
                las herramientas que te ayudarán a mantenerte seguro/a.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Líneas de ayuda</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Confidencial</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Costo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acoso y Hostigamiento */}
        <div className="section-card animated-card">
          <div className="section-header">
            <h3 className="section-title">
              <AlertTriangle className="section-icon" />
              Acoso y Hostigamiento
            </h3>
            <p className="section-description">Reconoce las señales y aprende cómo actuar</p>
          </div>
          <div className="education-content">
            <div className="content-with-image">
              <div className="content-text">
                <div className="info-card">
                  <h4 className="info-title">¿Qué es el acoso?</h4>
                  <p className="info-text">
                    El acoso es un comportamiento agresivo y repetitivo que incluye amenazas, 
                    intimidación, humillación o cualquier conducta que cause daño físico o emocional.
                  </p>
                </div>
                <div className="info-card">
                  <h4 className="info-title">Señales de alerta</h4>
                  <ul className="info-list">
                    <li>Comentarios ofensivos o amenazas constantes</li>
                    <li>Seguimiento o vigilancia no deseada</li>
                    <li>Mensajes o llamadas persistentes</li>
                    <li>Aislamiento social forzado</li>
                    <li>Control excesivo sobre actividades diarias</li>
                    <li>Destrucción de pertenencias personales</li>
                  </ul>
                </div>
              </div>
              <div className="content-image">
                <img 
                  src="/images/acoso-y-señales.png" 
                  alt="Acoso y señales de alerta" 
                  className="section-image"
                />
              </div>
            </div>
            
            {/* Tipos de acoso */}
            <div className="harassment-types">
              <h4 className="subsection-title">Tipos de Acoso</h4>
              <div className="harassment-grid">
                <div className="harassment-item">
                  <div className="harassment-icon">📱</div>
                  <h5>Ciberacoso</h5>
                  <p>Intimidación a través de redes sociales, mensajes o correos</p>
                </div>
                <div className="harassment-item">
                  <div className="harassment-icon">🏢</div>
                  <h5>Laboral</h5>
                  <p>Comportamientos hostiles en el ambiente de trabajo</p>
                </div>
                <div className="harassment-item">
                  <div className="harassment-icon">🎓</div>
                  <h5>Escolar</h5>
                  <p>Bullying en instituciones educativas</p>
                </div>
                <div className="harassment-item">
                  <div className="harassment-icon">🚶</div>
                  <h5>Callejero</h5>
                  <p>Acoso en espacios públicos y transporte</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tipos de Violencia */}
        <div className="section-card animated-card">
          <div className="section-header">
            <h3 className="section-title">
              <Shield className="section-icon" />
              Tipos de Violencia
            </h3>
            <p className="section-description">Identifica diferentes formas de violencia</p>
          </div>
          <div className="education-content">
            <div className="content-with-image">
              <div className="content-text">
                <div className="violence-types">
                  <div className="violence-item expanded">
                    <div className="violence-header">
                      <div className="violence-icon">🤕</div>
                      <h4 className="violence-title">Violencia Física</h4>
                    </div>
                    <p className="violence-description">
                      Cualquier acto que cause daño corporal, desde empujones hasta golpes severos.
                    </p>
                    <div className="violence-examples">
                      <h5>Ejemplos:</h5>
                      <ul>
                        <li>Golpes, bofetadas, puñetazos</li>
                        <li>Empujones, sacudidas</li>
                        <li>Uso de objetos como armas</li>
                        <li>Restricción de movimientos</li>
                      </ul>
                    </div>
                  </div>
                  <div className="violence-item expanded">
                    <div className="violence-header">
                      <div className="violence-icon">🧠</div>
                      <h4 className="violence-title">Violencia Psicológica</h4>
                    </div>
                    <p className="violence-description">
                      Intimidación, amenazas, humillación y control emocional que afecta la autoestima.
                    </p>
                    <div className="violence-examples">
                      <h5>Ejemplos:</h5>
                      <ul>
                        <li>Insultos y humillaciones constantes</li>
                        <li>Amenazas y chantajes</li>
                        <li>Aislamiento de familiares y amigos</li>
                        <li>Control excesivo de actividades</li>
                      </ul>
                    </div>
                  </div>
                  <div className="violence-item expanded">
                    <div className="violence-header">
                      <div className="violence-icon">⚠️</div>
                      <h4 className="violence-title">Violencia Sexual</h4>
                    </div>
                    <p className="violence-description">
                      Cualquier acto sexual no consentido o coacción para actividades sexuales.
                    </p>
                    <div className="violence-examples">
                      <h5>Incluye:</h5>
                      <ul>
                        <li>Contacto sexual sin consentimiento</li>
                        <li>Coacción o presión sexual</li>
                        <li>Exposición no deseada</li>
                        <li>Comentarios sexuales inapropiados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-image">
                <img 
                  src="/images/proteccion-violencia.png" 
                  alt="Protección contra la violencia" 
                  className="section-image"
                />
              </div>
            </div>
            
            {/* Ciclo de la violencia */}
            <div className="violence-cycle">
              <h4 className="subsection-title">Ciclo de la Violencia</h4>
              <div className="cycle-container">
                <div className="cycle-step">
                  <div className="cycle-number">⚡</div>
                  <h5>Tensión</h5>
                  <p>Acumulación de estrés y conflictos menores</p>
                </div>
                <div className="cycle-step">
                  <div className="cycle-number">💥</div>
                  <h5>Explosión</h5>
                  <p>Episodio de violencia física, verbal o emocional</p>
                </div>
                <div className="cycle-step">
                  <div className="cycle-number">🌹</div>
                  <h5>Reconciliación</h5>
                  <p>Disculpas, promesas de cambio, "luna de miel"</p>
                </div>
                <div className="cycle-step">
                  <div className="cycle-number">😌</div>
                  <h5>Calma</h5>
                  <p>Período de aparente normalidad antes de repetir</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prevención y Autocuidado */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">
              <Heart className="section-icon" />
              Prevención y Autocuidado
            </h3>
            <p className="section-description">Estrategias para mantenerte seguro/a</p>
          </div>
          <div className="education-content">
            <div className="prevention-grid">
              <div className="prevention-item">
                <h4 className="prevention-title">Confía en tu instinto</h4>
                <p className="prevention-text">
                  Si algo no se siente bien, probablemente no lo esté. Confía en tus sentimientos.
                </p>
              </div>
              <div className="prevention-item">
                <h4 className="prevention-title">Mantén contacto</h4>
                <p className="prevention-text">
                  Informa a personas de confianza sobre tu ubicación y planes.
                </p>
              </div>
              <div className="prevention-item">
                <h4 className="prevention-title">Conoce tus recursos</h4>
                <p className="prevention-text">
                  Ten a mano números de emergencia y conoce los servicios de apoyo disponibles.
                </p>
              </div>
              <div className="prevention-item">
                <h4 className="prevention-title">Documenta incidentes</h4>
                <p className="prevention-text">
                  Guarda evidencia de amenazas, mensajes o cualquier comportamiento preocupante.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan de Seguridad */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">
              <Shield className="section-icon" />
              Plan de Seguridad Personal
            </h3>
            <p className="section-description">Pasos importantes para tu protección</p>
          </div>
          <div className="education-content">
            <div className="safety-plan">
              <div className="safety-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4 className="step-title">Identifica lugares seguros</h4>
                  <p className="step-text">Conoce lugares donde puedas ir en caso de emergencia.</p>
                </div>
              </div>
              <div className="safety-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4 className="step-title">Prepara un kit de emergencia</h4>
                  <p className="step-text">Documentos importantes, dinero, medicamentos y ropa.</p>
                </div>
              </div>
              <div className="safety-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4 className="step-title">Establece códigos de seguridad</h4>
                  <p className="step-text">Palabras clave con familiares para pedir ayuda discretamente.</p>
                </div>
              </div>
              <div className="safety-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4 className="step-title">Practica rutas de escape</h4>
                  <p className="step-text">Conoce diferentes formas de salir de tu casa o trabajo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas Importantes */}
        <div className="section-card stats-section animated-card">
          <div className="section-header">
            <h3 className="section-title">
              <BookOpen className="section-icon" />
              Estadísticas que Debes Conocer
            </h3>
            <p className="section-description">Datos importantes sobre violencia y acoso</p>
          </div>
          <div className="education-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-value">51%</div>
                <div className="stat-label">de mujeres en Colombia ha sufrido violencia</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📱</div>
                <div className="stat-value">42%</div>
                <div className="stat-label">de jóvenes colombianos ha sufrido ciberacoso</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-value">68%</div>
                <div className="stat-label">de casos de acoso laboral no se reportan en Colombia</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-value">7 min</div>
                <div className="stat-label">cada 7 minutos una mujer es agredida en Colombia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="section-card testimonials-section animated-card">
          <div className="section-header">
            <h3 className="section-title">
              <Heart className="section-icon" />
              Historias de Superación
            </h3>
            <p className="section-description">Testimonios reales de personas que encontraron ayuda</p>
          </div>
          <div className="education-content">
            <div className="testimonials-container">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  {/* PLACEHOLDER PARA IMAGEN: Buscar una imagen de una persona (silueta o avatar).
                      Sugerencias: avatar femenino, silueta de mujer, ilustración de persona */}
                  <div className="image-placeholder small">
                    <div className="avatar-placeholder">👤</div>
                  </div>
                </div>
                <div className="testimonial-content">
                    <p className="testimonial-text">
                      "Pensé que estaba sola, pero cuando llamé a la línea de ayuda, 
                      encontré el apoyo que necesitaba. Ahora tengo una nueva vida."
                    </p>
                    <div className="testimonial-author">
                      <span className="author-name">María, 28 años</span>
                      <span className="author-location">Manizales, Caldas</span>
                    </div>
                  </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-image">
                  {/* PLACEHOLDER PARA IMAGEN: Buscar una imagen de una persona joven.
                      Sugerencias: avatar masculino joven, silueta de hombre joven */}
                  <div className="image-placeholder small">
                    <div className="avatar-placeholder">👤</div>
                  </div>
                </div>
                <div className="testimonial-content">
                    <p className="testimonial-text">
                      "El acoso escolar me tenía deprimido. Gracias a los recursos 
                      educativos aprendí a pedir ayuda y a defenderme."
                    </p>
                    <div className="testimonial-author">
                      <span className="author-name">Carlos, 16 años</span>
                      <span className="author-location">Manizales, Caldas</span>
                    </div>
                  </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-image">
                  {/* PLACEHOLDER PARA IMAGEN: Buscar una imagen de una persona adulta.
                      Sugerencias: avatar femenino adulto, silueta de mujer adulta */}
                  <div className="image-placeholder small">
                    <div className="avatar-placeholder">👤</div>
                  </div>
                </div>
                <div className="testimonial-content">
                    <p className="testimonial-text">
                      "En mi trabajo sufrí acoso durante meses. Documenté todo y 
                      busqué ayuda legal. Ahora trabajo en un ambiente seguro."
                    </p>
                    <div className="testimonial-author">
                      <span className="author-name">Ana, 35 años</span>
                      <span className="author-location">Manizales, Caldas</span>
                    </div>
                  </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-image">
                  {/* PLACEHOLDER PARA IMAGEN: Buscar una imagen de una persona joven.
                      Sugerencias: avatar masculino joven, silueta de hombre joven */}
                  <div className="image-placeholder small">
                    <div className="avatar-placeholder">👤</div>
                  </div>
                </div>
                <div className="testimonial-content">
                    <p className="testimonial-text">
                      "Mi familia me ayudó a salir de una relación tóxica. 
                      Con terapia y apoyo, recuperé mi autoestima y confianza."
                    </p>
                    <div className="testimonial-author">
                      <span className="author-name">Luis, 24 años</span>
                      <span className="author-location">Manizales, Caldas</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos de Emergencia */}
        <div className="section-card emergency-section animated-card">
          <div className="section-header">
            <h3 className="section-title">
              <Phone className="section-icon" />
              Recursos de Emergencia
            </h3>
            <p className="section-description">Contactos importantes para situaciones de crisis</p>
          </div>
          <div className="education-content">
            <div className="emergency-contacts">
              <div className="emergency-contact priority">
                <div className="contact-icon">🚨</div>
                <div className="contact-info">
                  <h4 className="contact-title">Emergencias Inmediatas</h4>
                  <p className="contact-number">📞 123</p>
                  <p className="contact-description">Policía Nacional - Para situaciones de peligro inmediato</p>
                </div>
              </div>
              <div className="emergency-contact">
                <div className="contact-icon">💬</div>
                <div className="contact-info">
                  <h4 className="contact-title">Línea Nacional Contra la Violencia</h4>
                  <p className="contact-number">📞 155</p>
                  <p className="contact-description">Disponible 24/7, confidencial y gratuito</p>
                </div>
              </div>
              <div className="emergency-contact">
                <div className="contact-icon">👩</div>
                <div className="contact-info">
                  <h4 className="contact-title">Línea Mujer Caldas</h4>
                  <p className="contact-number">📞 (606) 878-1360</p>
                  <p className="contact-description">Atención especializada para mujeres en Caldas</p>
                </div>
              </div>
              <div className="emergency-contact">
                <div className="contact-icon">🏥</div>
                <div className="contact-info">
                  <h4 className="contact-title">Línea de Salud Mental</h4>
                  <p className="contact-number">📞 106</p>
                  <p className="contact-description">Apoyo psicológico y referencias en Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Widget */}
      <FloatingAIWidget 
        isOpen={isAIWidgetOpen} 
        setIsOpen={setIsAIWidgetOpen} 
      />

      {/* Custom Alert */}
      <CustomAlert 
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />

      {/* Footer */}
      <Footer />

      {/* Background Particles */}
      <BackgroundParticles />
    </div>
  )
}