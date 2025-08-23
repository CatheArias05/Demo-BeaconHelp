import React, { useState, useEffect } from 'react'
import { X, Zap, Brain, PhoneCall, AlertTriangle, MessageCircle } from 'lucide-react'
import '../styles/FloatingAIWidget.css'

// Componente para efecto de escritura animada
const TypewriterText = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  return (
    <span className="typewriter-text">
      {displayedText.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </span>
  )
}

const FloatingAIWidget = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "¡Hola! Soy BeaconBot, tu asistente de seguridad con IA. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Respuestas contextuales basadas en palabras clave
    if (input.includes('emergencia') || input.includes('ayuda') || input.includes('socorro')) {
      return "🚨 Detecté una situación de emergencia. He activado el protocolo de respuesta rápida. ¿Necesitas que contacte servicios de emergencia o prefieres reportar el incidente primero?"
    }
    
    if (input.includes('ubicación') || input.includes('localización') || input.includes('donde')) {
      return "📍 Puedo ayudarte con información de ubicación. Tengo acceso a mapas interactivos y puntos de seguridad cercanos. ¿Necesitas localizar algún lugar específico o reportar tu ubicación actual?"
    }
    
    if (input.includes('contacto') || input.includes('persona') || input.includes('familiar')) {
      return "👥 Te ayudo con la gestión de contactos de emergencia. Puedo ayudarte a configurar contactos de confianza, enviar alertas automáticas o buscar personas en tu red de seguridad."
    }
    
    if (input.includes('reporte') || input.includes('incidente') || input.includes('problema')) {
      return "📋 Iniciando protocolo de reporte de incidentes. Puedo ayudarte a documentar el evento, clasificar el nivel de riesgo y enviar notificaciones a las autoridades correspondientes. ¿Qué tipo de incidente necesitas reportar?"
    }
    
    if (input.includes('seguridad') || input.includes('protección') || input.includes('riesgo')) {
      return "🛡️ Analizando tu consulta de seguridad... He identificado varios protocolos aplicables. Puedo realizar un análisis de riesgo personalizado y sugerir medidas preventivas. ¿Te encuentras en una situación de riesgo actualmente?"
    }
    
    if (input.includes('configuración') || input.includes('ajustes') || input.includes('settings')) {
      return "⚙️ Te ayudo con la configuración del sistema. Puedo ajustar notificaciones, configurar contactos de emergencia, personalizar alertas y optimizar tu perfil de seguridad. ¿Qué aspecto quieres configurar?"
    }
    
    if (input.includes('recursos') || input.includes('información') || input.includes('guía')) {
      return "📚 Tengo acceso a una amplia base de datos de recursos de seguridad. Puedo proporcionarte guías de autoprotección, números de emergencia, protocolos de evacuación y consejos de seguridad personalizados."
    }
    
    if (input.includes('hola') || input.includes('hi') || input.includes('buenos') || input.includes('buenas')) {
      return "¡Hola! 👋 Es un placer ayudarte. Soy tu asistente de seguridad con IA avanzada. Estoy aquí para protegerte y asistirte en cualquier situación. ¿En qué puedo ayudarte hoy?"
    }
    
    // Respuestas para palabras simples y confirmaciones
    if (input === 'sí' || input === 'si' || input === 'yes' || input === 'ok' || input === 'vale') {
      return "✅ Perfecto. Procedo con la acción solicitada. ¿Hay algo más en lo que pueda asistirte para garantizar tu seguridad?"
    }
    
    if (input === 'no' || input === 'nope' || input === 'negativo') {
      return "❌ Entendido. No hay problema. Si cambias de opinión o necesitas cualquier tipo de asistencia de seguridad, estaré aquí para ayudarte. ¿Hay algo más que pueda hacer por ti?"
    }
    
    if (input.includes('gracias') || input.includes('thanks') || input.includes('thank you')) {
      return "😊 ¡De nada! Es un placer ayudarte. Recuerda que estoy disponible 24/7 para cualquier consulta de seguridad o emergencia. ¡Mantente seguro!"
    }
    
    if (input.includes('perfecto') || input.includes('excelente') || input.includes('genial') || input.includes('bien')) {
      return "🎉 ¡Me alegra saber que todo está funcionando correctamente! Si necesitas más asistencia o tienes alguna consulta de seguridad, no dudes en contactarme."
    }
    
    if (input.includes('adiós') || input.includes('bye') || input.includes('hasta luego') || input.includes('chao')) {
      return "👋 ¡Hasta luego! Recuerda que siempre estaré aquí cuando me necesites. Mantente seguro y no dudes en contactarme ante cualquier situación. ¡Cuídate!"
    }
    
    // Respuesta por defecto inteligente
    const defaultResponses = [
      "🤖 Procesando tu consulta... He analizado tu mensaje y puedo ofrecerte varias opciones de asistencia. ¿Necesitas ayuda con seguridad, reportes, contactos o información de ubicación?",
      "💡 Entiendo tu consulta. Como tu asistente de IA especializado en seguridad, puedo ayudarte con análisis de riesgo, gestión de emergencias y protocolos de seguridad. ¿Podrías ser más específico?",
      "🔍 He procesado tu mensaje y detecté que podrías necesitar asistencia especializada. Tengo capacidades avanzadas en seguridad personal, gestión de crisis y coordinación de emergencias. ¿Cómo puedo ayudarte mejor?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsTyping(true)
    
    const currentInput = inputMessage
    setInputMessage("")

    // Simular tiempo de procesamiento de IA
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content: generateAIResponse(currentInput),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, Math.random() * 1500 + 800) // Entre 800ms y 2.3s para simular procesamiento real
  }

  const handleQuickAction = (actionType) => {
    const actionResponses = {
      'risk-analysis': {
        user: "Realizar análisis de riesgo",
        ai: "🔍 Iniciando análisis de riesgo avanzado...\n\n📊 **Evaluación completada:**\n• Nivel de riesgo actual: BAJO-MEDIO\n• Factores detectados: Ubicación segura, horario diurno\n• Recomendaciones: Mantener contactos actualizados\n• Próxima evaluación: En 2 horas\n\n¿Necesitas un análisis más detallado de algún aspecto específico?"
      },
      'ai-tips': {
        user: "Solicitar consejos de IA",
        ai: "🧠 **Consejos de Seguridad Personalizados:**\n\n🛡️ **Prevención:**\n• Mantén siempre informados a tus contactos de confianza\n• Evita rutas poco iluminadas durante la noche\n• Confía en tu instinto si algo no se siente bien\n\n📱 **Tecnología:**\n• Activa la ubicación en tiempo real\n• Configura alertas automáticas\n• Mantén la batería siempre cargada\n\n¿Te gustaría consejos específicos para alguna situación?"
      },
      'emergency-call': {
        user: "Activar llamada de emergencia",
        ai: "🚨 **PROTOCOLO DE EMERGENCIA ACTIVADO**\n\n📞 Preparando conexión con servicios de emergencia...\n📍 Ubicación detectada y compartida\n👥 Notificando a contactos de emergencia\n⏰ Tiempo de respuesta estimado: 3-5 minutos\n\n**Instrucciones:**\n• Mantén la calma\n• Permanece en línea\n• Sigue las indicaciones del operador\n\n¿Confirmas que necesitas asistencia inmediata?"
      },
      'report-incident': {
        user: "Reportar incidente",
        ai: "📋 **FORMULARIO DE REPORTE ACTIVADO**\n\n🔍 **Información requerida:**\n• Tipo de incidente: [Especificar]\n• Ubicación exacta: [Detectada automáticamente]\n• Hora del evento: [Registrada]\n• Personas involucradas: [Opcional]\n• Nivel de urgencia: [A evaluar]\n\n📸 Puedes adjuntar evidencia fotográfica\n🎙️ Grabación de audio disponible\n\n¿Qué tipo de incidente necesitas reportar?"
      }
    }

    const response = actionResponses[actionType]
    if (response) {
      const userMessage = {
        id: messages.length + 1,
        type: "user",
        content: response.user,
      }
      
      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)
      
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          type: "ai",
          content: response.ai,
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, Math.random() * 1000 + 1200)
    }
  }

  const quickActions = [
    { icon: Zap, label: "Análisis de Riesgo", action: () => handleQuickAction('risk-analysis') },
    { icon: Brain, label: "Consejos IA", action: () => handleQuickAction('ai-tips') },
    { icon: PhoneCall, label: "Llamada de Emergencia", action: () => handleQuickAction('emergency-call') },
    { icon: AlertTriangle, label: "Reportar Incidente", action: () => handleQuickAction('report-incident') },
  ]

  return (
    <>
      {/* AI Widget Button */}
      <div className="ai-widget-button">
        <button className="ai-btn" onClick={() => setIsOpen(!isOpen)}>
          <div className="ai-btn-content">
            <div className="ai-robot-container">
              <img
                src="/images/ai-robot.png"
                alt="BeaconBot AI Assistant"
                className="ai-robot-img"
              />
            </div>
            <div className="ai-status-indicator">
              <div className="ai-status-dot"></div>
            </div>
          </div>
        </button>
      </div>

      {/* AI Chat Widget */}
      {isOpen && (
        <div className="ai-chat-widget">
          <div className="ai-chat-container">
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-content">
                <div className="ai-header-avatar">
                  <img
                    src="/images/ai-robot.png"
                    alt="BeaconBot AI Assistant"
                    className="ai-header-img"
                  />
                </div>
                <div className="ai-header-info">
                  <h3 className="ai-header-title">BeaconBot</h3>
                  <p className="ai-header-subtitle">Asistente IA de Seguridad</p>
                </div>
              </div>
              <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
                <X className="ai-close-icon" />
              </button>
            </div>

            {/* Content */}
            <div className="ai-chat-content">
              {/* Chat Messages */}
              <div className="ai-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`ai-message ${message.type === "user" ? 'ai-message-user' : 'ai-message-ai'}`}
                  >
                    <div className="ai-message-bubble">
                      {message.type === 'ai' ? (
                        <TypewriterText text={message.content} speed={30} />
                      ) : (
                        message.content.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="ai-message ai-message-ai">
                    <div className="ai-message-bubble ai-typing">
                      <span className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      BeaconBot está escribiendo...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="ai-quick-actions">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="ai-quick-action"
                    onClick={action.action}
                  >
                    <action.icon className="ai-action-icon" />
                    <span className="ai-action-label">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <div className="ai-input-container">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Escribe tu consulta..."
                  className="ai-input"
                />
                <button className="ai-send-btn" onClick={handleSendMessage}>
                  <MessageCircle className="ai-send-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingAIWidget