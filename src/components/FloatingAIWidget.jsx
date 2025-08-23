import React, { useState } from 'react'
import { X, Zap, Brain, PhoneCall, AlertTriangle, MessageCircle } from 'lucide-react'
import '../styles/FloatingAIWidget.css'

const FloatingAIWidget = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "¡Hola! Soy BeaconBot, tu asistente de seguridad con IA. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
    }

    setMessages((prev) => [...prev, newUserMessage])

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content: "Entiendo tu consulta. Te ayudo con información de seguridad personalizada. ¿Necesitas activar algún protocolo de emergencia?",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputMessage("")
  }

  const quickActions = [
    { icon: Zap, label: "Análisis de Riesgo", action: () => console.log("Risk analysis") },
    { icon: Brain, label: "Consejos IA", action: () => console.log("AI tips") },
    { icon: PhoneCall, label: "Llamada de Emergencia", action: () => console.log("Emergency call") },
    { icon: AlertTriangle, label: "Reportar Incidente", action: () => console.log("Report incident") },
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
                      {message.content}
                    </div>
                  </div>
                ))}
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