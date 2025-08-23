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
import '../../styles/Reports.css';

export default function ReportsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false)

  const reports = [
    { id: 1, type: "Violencia Doméstica", date: "2024-01-15", status: "En proceso", priority: "Alta" },
    { id: 2, type: "Robo", date: "2024-01-10", status: "Resuelto", priority: "Media" },
    { id: 3, type: "Acoso", date: "2024-01-05", status: "Pendiente", priority: "Alta" },
    { id: 4, type: "Vandalismo", date: "2024-01-02", status: "En proceso", priority: "Baja" },
  ]

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
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)} />}

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
            <Button className="add-report-btn">
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
                    <Button variant="outline" size="sm" className="action-btn">
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="action-btn">
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
    </div>
  )
}
