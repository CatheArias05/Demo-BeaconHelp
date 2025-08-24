"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, FileText, Users, Settings, User, LogOut, Plus, Shield } from "lucide-react"
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatingAIWidget from '../../components/FloatingAIWidget';
import Footer from '../../components/Footer';
import BackgroundParticles from '../../components/BackgroundParticles';
import { NewReportModal, DetailsModal, EditModal } from '../../components/ReportModals';
import '../../styles/Reports.css';
import '../../styles/ReportModals.css';

export default function ReportsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false)
  
  // Estados para modales
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  const [reports, setReports] = useState([
    { 
      id: 1, 
      type: "Violencia Doméstica", 
      date: "2024-01-15", 
      status: "En proceso", 
      priority: "Alta",
      description: "Incidente reportado en zona residencial. Se requiere intervención inmediata.",
      location: "Calle Principal 123, Zona Norte"
    },
    { 
      id: 2, 
      type: "Robo", 
      date: "2024-01-10", 
      status: "Resuelto", 
      priority: "Media",
      description: "Robo de vehículo en estacionamiento público. Caso resuelto con recuperación del vehículo.",
      location: "Centro Comercial Plaza, Estacionamiento B"
    },
    { 
      id: 3, 
      type: "Acoso", 
      date: "2024-01-05", 
      status: "Pendiente", 
      priority: "Alta",
      description: "Reporte de acoso laboral. Pendiente de investigación.",
      location: "Oficinas Torre Empresarial, Piso 8"
    },
    { 
      id: 4, 
      type: "Vandalismo", 
      date: "2024-01-02", 
      status: "En proceso", 
      priority: "Baja",
      description: "Daños a propiedad pública en parque local.",
      location: "Parque Central, Zona de Juegos"
    },
  ])

  // Funciones para manejar reportes
  const handleNewReport = (newReport) => {
    setReports(prev => [newReport, ...prev])
  }

  const handleUpdateReport = (updatedReport) => {
    setReports(prev => prev.map(report => 
      report.id === updatedReport.id ? updatedReport : report
    ))
  }

  const handleDeleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId))
  }

  return (
    <div className="reports-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-icons">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="floating-icon" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}>
              <Shield className="shield-icon" />
            </div>
          ))}
        </div>
      </div>

      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="reports" 
      />

      {/* Overlay para cerrar el sidebar */}


      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      {/* Main Content */}
      <div className="main-content">
        <div className="reports-content">
          <div className="reports-header">
            <div className="logo-section">
              <img src="/images/beacon-logo.png" alt="BeaconHelp Logo" className="logo" />
              <h1>Mis Reportes</h1>
            </div>
            <p>Gestiona y revisa tus reportes de emergencia</p>
            <Button className="add-report-btn" onClick={() => setIsNewReportModalOpen(true)}>
              <Plus size={20} />
              Nuevo Reporte
            </Button>
          </div>

          <div className="reports-list">
            {reports.map((report) => (
              <Card key={report.id} className="report-card">
                <CardContent className="report-content">
                  <div className="report-info">
                    <div className="report-details">
                      <h3 className="report-title">{report.type}</h3>
                      <p className="report-date">Fecha: {report.date}</p>
                    </div>
                    <div className="report-badges">
                      <Badge 
                        variant={report.priority === "Alta" ? "destructive" : report.priority === "Media" ? "default" : "secondary"}
                        className="priority-badge"
                      >
                        {report.priority}
                      </Badge>
                      <Badge 
                        className={`status-badge ${
                          report.status === "Resuelto" ? "resolved" : 
                          report.status === "En proceso" ? "in-progress" : "pending"
                        }`}
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="report-actions">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="action-btn"
                      onClick={() => {
                        setSelectedReport(report)
                        setIsDetailsModalOpen(true)
                      }}
                    >
                      Ver Detalles
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="action-btn"
                      onClick={() => {
                        setSelectedReport(report)
                        setIsEditModalOpen(true)
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <FloatingAIWidget isOpen={isAIWidgetOpen} setIsOpen={setIsAIWidgetOpen} />
      
      {/* Modales */}
      <NewReportModal 
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        onSubmit={handleNewReport}
      />
      
      <DetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        report={selectedReport}
        onDelete={handleDeleteReport}
      />
      
      <EditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        report={selectedReport}
        onUpdate={handleUpdateReport}
      />
      
      <BackgroundParticles />
      
      <Footer />
    </div>
  )
}
