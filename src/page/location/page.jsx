"use client"

import { useState, useEffect } from "react"
import { Menu, X, MapPin, Navigation, Bell, Users, Settings, User, LogOut, Plus, Phone, AlertTriangle, Clock, Search, Filter, Shield, RefreshCw, Crosshair } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FloatingAIWidget from '../../components/FloatingAIWidget';
import CustomAlert from '../../components/CustomAlert';
import Footer from '../../components/Footer';
import '../../styles/Location.css';
import InteractiveMap from '../../components/InteractiveMap';

const LocationPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAIWidgetOpen, setIsAIWidgetOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [alert, setAlert] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const emergencyLocations = [
    {
      id: 1,
      name: "Hospital de Caldas",
      type: "hospital",
      address: "Calle 15 #23-55, Manizales",
      phone: "(606) 878-6000",
      coordinates: { lat: 5.0703, lng: -75.5138 },
      status: "available",
      capacity: "78%",
      services: ["Emergencias", "UCI", "Cirugía", "Pediatría"]
    },
    {
      id: 2,
      name: "Bomberos Manizales",
      type: "fire_station",
      address: "Carrera 23 #26-40, Centro",
      phone: "119",
      coordinates: { lat: 5.0689, lng: -75.5174 },
      status: "available",
      capacity: "Disponible",
      services: ["Rescate", "Incendios", "Emergencias"]
    },
    {
      id: 3,
      name: "Policía Nacional Manizales",
      type: "police",
      address: "Carrera 22 #25-18, Centro",
      phone: "123",
      coordinates: { lat: 5.0692, lng: -75.5165 },
      status: "available",
      capacity: "Activo",
      services: ["Seguridad", "Emergencias", "Patrullaje"]
    },
    {
      id: 4,
      name: "Cruz Roja Caldas",
      type: "medical",
      address: "Calle 61 #23-15, Manizales",
      phone: "(606) 884-5555",
      coordinates: { lat: 5.0665, lng: -75.5201 },
      status: "busy",
      capacity: "Ocupado",
      services: ["Primeros Auxilios", "Ambulancia", "Rescate"]
    },
    {
      id: 5,
      name: "Defensa Civil Caldas",
      type: "emergency",
      address: "Carrera 20 #30-45, Manizales",
      phone: "(606) 887-9000",
      coordinates: { lat: 5.0721, lng: -75.5189 },
      status: "available",
      capacity: "Disponible",
      services: ["Prevención", "Rescate", "Emergencias"]
    },
    {
      id: 6,
      name: "Hospital Universitario de Caldas",
      type: "hospital",
      address: "Calle 7 #8-10, Manizales",
      phone: "(606) 878-1500",
      coordinates: { lat: 5.0647, lng: -75.5143 },
      status: "available",
      capacity: "65%",
      services: ["Emergencias", "Trauma", "Medicina General"]
    }
  ];

  const locationTypes = [
    { id: 'all', name: 'Todos', icon: MapPin },
    { id: 'hospital', name: 'Hospitales', icon: MapPin },
    { id: 'fire_station', name: 'Bomberos', icon: MapPin },
    { id: 'police', name: 'Policía', icon: MapPin },
    { id: 'medical', name: 'Médicos', icon: MapPin },
    { id: 'emergency', name: 'Emergencia', icon: MapPin }
  ];

  // Funciones de geolocalización
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('La geolocalización no es compatible con este navegador.');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newLocation);
        setLocationAccuracy(position.coords.accuracy);
        setLastUpdated(new Date());
        setIsLoadingLocation(false);

        const id = navigator.geolocation.watchPosition(
          (position) => {
            const updatedLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(updatedLocation);
            setLocationAccuracy(position.coords.accuracy);
            setLastUpdated(new Date());
          },
          (error) => {
            console.error('Error en seguimiento de ubicación:', error);
            setLocationError(getLocationErrorMessage(error));
          },
          options
        );
        setWatchId(id);
      },
      (error) => {
        setIsLoadingLocation(false);
        setLocationError(getLocationErrorMessage(error));
      },
      options
    );
  };

  const stopLocationTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const getLocationErrorMessage = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Acceso a la ubicación denegado. Por favor, permite el acceso para usar esta función.";
      case error.POSITION_UNAVAILABLE:
        return "Información de ubicación no disponible.";
      case error.TIMEOUT:
        return "Tiempo de espera agotado al obtener la ubicación.";
      default:
        return "Error desconocido al obtener la ubicación.";
    }
  };

  const refreshLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          setLocationAccuracy(position.coords.accuracy);
          setLastUpdated(new Date());
          setIsLoadingLocation(false);
        },
        (error) => {
          setIsLoadingLocation(false);
          setLocationError(getLocationErrorMessage(error));
        }
      );
    }
  };

  const shareEmergencyLocation = () => {
    if (userLocation) {
      const locationText = `Mi ubicación de emergencia: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      if (navigator.share) {
        navigator.share({
          title: 'Mi Ubicación de Emergencia',
          text: locationText
        });
      } else {
        navigator.clipboard.writeText(locationText);
        setAlert({
          isVisible: true,
          type: 'success',
          title: 'Ubicación Copiada',
          message: 'La ubicación de emergencia ha sido copiada al portapapeles exitosamente.'
        });
      }
    }
  };

  const closeAlert = () => {
    setAlert({
      isVisible: false,
      type: 'success',
      title: '',
      message: '',
      confirmText: '',
      cancelText: '',
      onConfirm: null,
      onCancel: null
    });
  };

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

  // Función para manejar llamadas telefónicas
  const handlePhoneCall = (contact) => {
    const phone = typeof contact === 'string' ? contact : contact.phone;
    
    if (isMobileDevice()) {
      setAlert({
        isVisible: true,
        type: 'confirm',
        title: 'Llamada de Emergencia',
        message: `¿Deseas llamar al número ${phone}?`,
        confirmText: 'Llamar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          window.open(`tel:${phone}`, '_self');
          closeAlert();
        },
        onCancel: closeAlert
      });
    } else {
      setAlert({
        isVisible: true,
        type: 'confirm',
        title: 'Opciones de contacto',
        message: `Número: ${phone}\n\n¿Qué deseas hacer?`,
        confirmText: 'Copiar número',
        cancelText: 'Abrir teléfono',
        onConfirm: () => {
          copyToClipboard(phone);
        },
        onCancel: () => {
          try {
            window.open(`tel:${phone}`, '_blank');
            closeAlert();
          } catch (error) {
            setAlert({
              isVisible: true,
              type: 'warning',
              title: 'No disponible',
              message: 'No se pudo abrir la aplicación de teléfono. El número ha sido copiado al portapapeles.'
            });
            copyToClipboard(phone);
          }
        }
      });
    }
  };

  // Funciones para los botones de acción
  const handleCall = (phone) => {
    handlePhoneCall(phone);
  };

  const handleDirections = (coordinates) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    startLocationTracking();
    return () => {
      stopLocationTracking();
    };
  }, []);

  const calculateDistance = (pos1, pos2) => {
    const R = 6371;
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLon = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'green';
      case 'busy': return 'orange';
      case 'unavailable': return 'red';
      case 'active': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'busy': return 'Ocupado';
      case 'active': return 'Activo';
      case 'unavailable': return 'No Disponible';
      default: return 'Desconocido';
    }
  };

  const filteredLocations = emergencyLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || location.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="location-container">
      <Sidebar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        currentPage="location" 
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
        
        <div className="location-content">
          <div className="location-header">
            <div className="logo">
              <img 
                src="/images/beacon-logo.png" 
                alt="BeaconHelp Logo" 
                className="logo-img"
              />
            </div>
            <div className="header-content">
              <h1>Ubicaciones de Emergencia</h1>
              <p>Encuentra servicios de emergencia cercanos a tu ubicación</p>
            </div>
          </div>

          <div className="location-controls">
            <div className="search-section">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar ubicaciones..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-container">
                <Filter className="filter-icon" />
                <select 
                  className="filter-select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {locationTypes.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Mensaje de error de ubicación */}
            {locationError && (
              <div className="location-error-banner">
                <AlertTriangle className="error-icon" />
                <div className="error-content">
                  <h4>Error de Ubicación</h4>
                  <p>{locationError}</p>
                  {locationError.includes('denegado') && (
                    <div className="error-actions">
                      <p className="error-help">Para habilitar la ubicación:</p>
                      <ol className="error-steps">
                        <li>Haz clic en el ícono de ubicación en la barra de direcciones</li>
                        <li>Selecciona "Permitir" para este sitio</li>
                        <li>Recarga la página</li>
                      </ol>
                      <button 
                        className="retry-btn" 
                        onClick={() => {
                          setLocationError(null);
                          startLocationTracking();
                        }}
                      >
                        <RefreshCw size={16} />
                        Intentar de nuevo
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  className="error-close-btn"
                  onClick={() => setLocationError(null)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="locations-grid">
            <div className="emergency-locations">
              <h3 className="section-title">Servicios Disponibles ({filteredLocations.length})</h3>
              <div className="locations-list">
                {filteredLocations.map((location) => {
                  const distance = userLocation ? calculateDistance(userLocation, location.coordinates) : null;
                  
                  return (
                    <div key={location.id} className="location-card">
                      <div className="location-card-content">
                        <div className="location-info">
                          <div className="location-icon">
                            {location.type === 'hospital' && '🏥'}
                            {location.type === 'fire_station' && '🚒'}
                            {location.type === 'police' && '👮'}
                            {location.type === 'medical' && '🚑'}
                            {location.type === 'emergency' && '🆘'}
                          </div>
                          
                          <div className="location-details">
                            <div className="location-header-info">
                              <h4 className="location-name">{location.name}</h4>
                              <span className={`status-badge ${location.status}`}>
                                {getStatusText(location.status)}
                              </span>
                            </div>
                            
                            <p className="location-address">{location.address}</p>
                            
                            <div className="location-meta">
                              <div className="contact-info">
                                <Phone size={16} />
                                <span>{location.phone}</span>
                              </div>
                              
                              <div className="capacity-info">
                                <Users size={16} />
                                <span>{location.capacity}</span>
                              </div>
                              
                              {distance && (
                                <div className="distance-info">
                                  <MapPin size={16} />
                                  <span>{distance.toFixed(1)} km</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="location-services">
                              <h5>Servicios:</h5>
                              <div className="services-tags">
                                {location.services.map((service, index) => (
                                  <span key={index} className="service-tag">{service}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="location-actions">
                          <button 
                            className="call-btn"
                            onClick={() => handleCall(location.phone)}
                          >
                            <Phone size={16} />
                            Llamar
                          </button>
                          <button 
                            className="directions-btn"
                            onClick={() => handleDirections(location.coordinates)}
                          >
                            <Navigation size={16} />
                            Direcciones
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="map-section">
              <div className="map-container">
                <InteractiveMap 
                  emergencyLocations={filteredLocations}
                  userLocation={userLocation}
                  className="emergency-map"
                />
              </div>
            </div>
          </div>

          {userLocation && (
            <div className="location-status-card">
              <div className="location-status-content">
                <div className="location-status-header">
                  <div className="status-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="status-info">
                    <h4>Mi Ubicación</h4>
                    <span className="status-badge live">
                      {watchId ? 'En Vivo' : 'Estático'}
                    </span>
                  </div>
                </div>
                
                <div className="coordinates">
                  Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
                </div>
                
                {locationAccuracy && (
                  <div className="accuracy">
                    Precisión: ±{Math.round(locationAccuracy)}m
                  </div>
                )}
                
                {lastUpdated && (
                  <div className="last-updated">
                    Actualizado: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
                
                <div className="location-actions">
                  <button className="refresh-btn" onClick={refreshLocation}>
                    <RefreshCw size={16} />
                    Actualizar
                  </button>
                  <button className="share-btn" onClick={shareEmergencyLocation}>
                    <Navigation size={16} />
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <FloatingAIWidget isOpen={isAIWidgetOpen} setIsOpen={setIsAIWidgetOpen} />
      
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
        onConfirm={alert.onConfirm}
        onCancel={alert.onCancel}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
      />
      
      <Footer />
    </div>
  );
};

export default LocationPage;
