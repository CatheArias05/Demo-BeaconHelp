import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Bell, Shield, Globe, Moon, Sun, Volume2, VolumeX, Smartphone, Mail, Lock, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatingAIWidget from '../../components/FloatingAIWidget';
import CustomAlert from '../../components/CustomAlert';
import Footer from '../../components/Footer';
import BackgroundParticles from '../../components/BackgroundParticles';
import '../../styles/Settings.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Estados para el menú y sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const [settings, setSettings] = useState({
    // Perfil
    name: 'Usuario Demo',
    email: 'usuario@emergencia.com',
    phone: '+58 412 123 4567',
    location: 'Caracas, Venezuela',
    
    // Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    emergencyAlerts: true,
    soundEnabled: true,
    
    // Privacidad
    shareLocation: true,
    publicProfile: false,
    dataCollection: true,
    
    // Apariencia
    darkMode: isDarkMode,
    language: 'es',
    fontSize: 'medium',
    
    // Seguridad
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: '30'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Si es el cambio de tema, aplicarlo inmediatamente
    if (key === 'darkMode') {
      setTheme(value ? 'dark' : 'light');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setAlert({
      isVisible: true,
      type: 'success',
      title: 'Configuración Guardada',
      message: 'Todos los cambios han sido guardados exitosamente.'
    });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
    { id: 'appearance', name: 'Apariencia', icon: Settings },
    { id: 'security', name: 'Seguridad', icon: Lock }
  ];

  const renderProfileTab = () => (
    <div className="settings-section">
      <h3>Información Personal</h3>
      
      <div className="form-group">
        <label>Nombre Completo</label>
        <input
          type="text"
          value={settings.name}
          onChange={(e) => handleSettingChange('name', e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Correo Electrónico</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleSettingChange('email', e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => handleSettingChange('phone', e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Ubicación</label>
        <input
          type="text"
          value={settings.location}
          onChange={(e) => handleSettingChange('location', e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Cambiar Contraseña</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            className="form-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>Preferencias de Notificación</h3>
      
      <div className="toggle-group">
        <div className="toggle-item">
          <div className="toggle-info">
            <Mail size={20} />
            <div>
              <h4>Notificaciones por Email</h4>
              <p>Recibir alertas y actualizaciones por correo</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <Bell size={20} />
            <div>
              <h4>Notificaciones Push</h4>
              <p>Alertas instantáneas en el navegador</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <Smartphone size={20} />
            <div>
              <h4>Mensajes SMS</h4>
              <p>Alertas críticas por mensaje de texto</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <Shield size={20} />
            <div>
              <h4>Alertas de Emergencia</h4>
              <p>Notificaciones de emergencias cercanas</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emergencyAlerts}
              onChange={(e) => handleSettingChange('emergencyAlerts', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <div>
              <h4>Sonidos</h4>
              <p>Reproducir sonidos con las notificaciones</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="settings-section">
      <h3>Configuración de Privacidad</h3>
      
      <div className="toggle-group">
        <div className="toggle-item">
          <div className="toggle-info">
            <Globe size={20} />
            <div>
              <h4>Compartir Ubicación</h4>
              <p>Permitir que la app acceda a tu ubicación para emergencias</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.shareLocation}
              onChange={(e) => handleSettingChange('shareLocation', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <User size={20} />
            <div>
              <h4>Perfil Público</h4>
              <p>Hacer visible tu perfil a otros usuarios</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.publicProfile}
              onChange={(e) => handleSettingChange('publicProfile', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <Shield size={20} />
            <div>
              <h4>Recopilación de Datos</h4>
              <p>Permitir análisis para mejorar el servicio</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.dataCollection}
              onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="settings-section">
      <h3>Personalización</h3>
      
      <div className="form-group">
        <label>Tema</label>
        <div className="theme-selector">
          <button
            className={`theme-btn ${!settings.darkMode ? 'active' : ''}`}
            onClick={() => handleSettingChange('darkMode', false)}
          >
            <Sun size={20} />
            Claro
          </button>
          <button
            className={`theme-btn ${settings.darkMode ? 'active' : ''}`}
            onClick={() => handleSettingChange('darkMode', true)}
          >
            <Moon size={20} />
            Oscuro
          </button>
        </div>
      </div>
      
      <div className="form-group">
        <label>Idioma</label>
        <select
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className="form-select"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Tamaño de Fuente</label>
        <select
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="form-select"
        >
          <option value="small">Pequeña</option>
          <option value="medium">Mediana</option>
          <option value="large">Grande</option>
        </select>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>Configuración de Seguridad</h3>
      
      <div className="toggle-group">
        <div className="toggle-item">
          <div className="toggle-info">
            <Lock size={20} />
            <div>
              <h4>Autenticación de Dos Factores</h4>
              <p>Agregar una capa extra de seguridad</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="toggle-item">
          <div className="toggle-info">
            <Smartphone size={20} />
            <div>
              <h4>Autenticación Biométrica</h4>
              <p>Usar huella dactilar o reconocimiento facial</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.biometricAuth}
              onChange={(e) => handleSettingChange('biometricAuth', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Tiempo de Sesión (minutos)</label>
        <select
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
          className="form-select"
        >
          <option value="15">15 minutos</option>
          <option value="30">30 minutos</option>
          <option value="60">1 hora</option>
          <option value="120">2 horas</option>
          <option value="0">Sin límite</option>
        </select>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      case 'appearance': return renderAppearanceTab();
      case 'security': return renderSecurityTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="settings-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-icons">
          <Settings className="floating-icon" />
          <User className="floating-icon" />
          <Bell className="floating-icon" />
          <Shield className="floating-icon" />
          <Lock className="floating-icon" />
        </div>
      </div>

      {/* Overlay */}
      <div className="overlay"></div>
      
      <Sidebar 
        currentPage="settings" 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <div className="main-content">
        <Header 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        
        <div className="settings-content">
          <div className="settings-header">
            <div className="logo-section">
              <img 
                src="/images/beacon-logo.png" 
                alt="BeaconHelp Logo" 
                className="settings-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="logo-fallback" style={{display: 'none'}}>
                <Settings size={48} />
              </div>
            </div>
            <h1>Configuración</h1>
            <p>Personaliza tu experiencia y preferencias</p>
          </div>

          <div className="settings-layout">
            <div className="settings-sidebar">
              <nav className="settings-nav">
                {tabs.map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <IconComponent size={20} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="settings-main">
              <div className="settings-content-area">
                {renderTabContent()}
                
                <div className="settings-actions">
                  <button 
                    className="save-btn"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw size={20} className="spinning" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                  
                  <button className="reset-btn">
                    <RefreshCw size={20} />
                    Restablecer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BackgroundParticles />
      
      <FloatingAIWidget />
      
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />
      
      <Footer />
    </div>
  );
};

export default SettingsPage;
