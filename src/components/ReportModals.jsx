import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, AlertTriangle, FileText, Calendar, MapPin, Phone } from 'lucide-react'

// Modal para Nuevo Reporte
export function NewReportModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    priority: 'Media',
    anonymous: false
  })

  const reportTypes = [
    'Violencia Doméstica',
    'Robo',
    'Acoso',
    'Vandalismo',
    'Emergencia Médica',
    'Accidente',
    'Otro'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const newReport = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente'
    }
    onSubmit(newReport)
    setFormData({ type: '', description: '', location: '', priority: 'Media', anonymous: false })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Card className="modal-card">
          <CardHeader className="modal-header">
            <div className="modal-title-section">
              <FileText className="modal-icon" />
              <CardTitle>Nuevo Reporte</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="close-btn">
              <X size={20} />
            </Button>
          </CardHeader>
          <CardContent className="modal-content">
            <form onSubmit={handleSubmit} className="report-form">
              <div className="form-group">
                <label htmlFor="type">Tipo de Incidente *</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="form-select"
                >
                  <option value="">Selecciona un tipo</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Describe lo que ocurrió..."
                  className="form-textarea"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Dirección o ubicación del incidente"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Prioridad</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    className="form-checkbox"
                  />
                  Enviar de forma anónima
                </label>
              </div>

              <div className="form-actions">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="submit-btn">
                  Crear Reporte
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Modal para Ver Detalles
export function DetailsModal({ isOpen, onClose, report, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este reporte? Esta acción no se puede deshacer.')) {
      onDelete(report.id)
      onClose()
    }
  }

  if (!isOpen || !report) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Card className="modal-card">
          <CardHeader className="modal-header">
            <div className="modal-title-section">
              <FileText className="modal-icon" />
              <CardTitle>Detalles del Reporte #{report.id}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="close-btn">
              <X size={20} />
            </Button>
          </CardHeader>
          <CardContent className="modal-content">
            <div className="details-content">
              <div className="detail-item">
                <div className="detail-label">
                  <AlertTriangle size={16} />
                  Tipo de Incidente
                </div>
                <div className="detail-value">{report.type}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Calendar size={16} />
                  Fecha de Reporte
                </div>
                <div className="detail-value">{report.date}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Estado</div>
                <Badge 
                  className={`status-badge ${
                    report.status === "Resuelto" ? "resolved" : 
                    report.status === "En proceso" ? "in-progress" : "pending"
                  }`}
                >
                  {report.status}
                </Badge>
              </div>

              <div className="detail-item">
                <div className="detail-label">Prioridad</div>
                <Badge 
                  variant={report.priority === "Alta" ? "destructive" : report.priority === "Media" ? "default" : "secondary"}
                  className="priority-badge"
                >
                  {report.priority}
                </Badge>
              </div>

              {report.location && (
                <div className="detail-item">
                  <div className="detail-label">
                    <MapPin size={16} />
                    Ubicación
                  </div>
                  <div className="detail-value">{report.location}</div>
                </div>
              )}

              {report.description && (
                <div className="detail-item full-width">
                  <div className="detail-label">Descripción</div>
                  <div className="detail-value description">{report.description}</div>
                </div>
              )}

              <div className="detail-item">
                <div className="detail-label">ID de Seguimiento</div>
                <div className="detail-value tracking-id">#{report.id}</div>
              </div>
            </div>

            <div className="modal-actions">
              <Button 
                onClick={handleDelete} 
                className="delete-btn"
                variant="destructive"
              >
                Eliminar Reporte
              </Button>
              <Button onClick={onClose} className="close-modal-btn">
                Cerrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Modal para Editar Reporte
export function EditModal({ isOpen, onClose, report, onUpdate }) {
  const [formData, setFormData] = useState({
    type: report?.type || '',
    description: report?.description || '',
    location: report?.location || '',
    priority: report?.priority || 'Media'
  })

  const reportTypes = [
    'Violencia Doméstica',
    'Robo',
    'Acoso',
    'Vandalismo',
    'Emergencia Médica',
    'Accidente',
    'Otro'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedReport = {
      ...report,
      ...formData
    }
    onUpdate(updatedReport)
    onClose()
  }

  if (!isOpen || !report) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Card className="modal-card">
          <CardHeader className="modal-header">
            <div className="modal-title-section">
              <FileText className="modal-icon" />
              <CardTitle>Editar Reporte #{report.id}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="close-btn">
              <X size={20} />
            </Button>
          </CardHeader>
          <CardContent className="modal-content">
            <form onSubmit={handleSubmit} className="report-form">
              <div className="form-group">
                <label htmlFor="edit-type">Tipo de Incidente *</label>
                <select
                  id="edit-type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="form-select"
                >
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Descripción</label>
                <textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe lo que ocurrió..."
                  className="form-textarea"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-location">Ubicación</label>
                <input
                  type="text"
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Dirección o ubicación del incidente"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-priority">Prioridad</label>
                <select
                  id="edit-priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>

              <div className="form-actions">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="submit-btn">
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}