import React, { useEffect, useRef } from 'react';

const InteractiveMap = ({ userLocation, emergencyLocations = [], className = '' }) => {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  const calculateDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return null;
    const R = 6371; // Radio de la Tierra en km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const initializeMap = () => {
    if (!window.L || !mapRef.current) return;

    // Limpiar mapa existente
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Coordenadas por defecto (Caracas, Venezuela)
    const defaultCenter = [10.4806, -66.9036];
    const center = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;

    // Crear nuevo mapa
    const map = window.L.map(mapRef.current).setView(center, userLocation ? 13 : 10);
    mapInstanceRef.current = map;

    // Agregar capa de tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcador del usuario
    if (userLocation && userLocation.lat && userLocation.lng) {
      const userIcon = window.L.divIcon({
        html: `<div style="background: #2563eb; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937;">📍 Tu Ubicación</h4>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              Lat: ${userLocation.lat.toFixed(6)}<br/>
              Lng: ${userLocation.lng.toFixed(6)}
            </p>
            ${userLocation.accuracy ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">Precisión: ±${Math.round(userLocation.accuracy)}m</p>` : ''}
          </div>
        `);
    }

    // Agregar marcadores de emergencia
    if (emergencyLocations && emergencyLocations.length > 0) {
      emergencyLocations.forEach((location) => {
        if (location.coordinates && location.coordinates.lat && location.coordinates.lng) {
          const distance = userLocation ? calculateDistance(userLocation, location.coordinates) : null;
          
          const getEmergencyIcon = (type) => {
            const icons = {
              hospital: '🏥',
              fire_station: '🚒',
              police: '👮',
              medical: '🚑',
              emergency: '🆘'
            };
            return icons[type] || '🆘';
          };

          const emergencyIcon = window.L.divIcon({
            html: `<div style="background: #dc2626; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 16px;">${getEmergencyIcon(location.type)}</div>`,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const statusText = location.status === 'available' ? 'Disponible' : location.status === 'busy' ? 'Ocupado' : 'No disponible';
          const statusColor = location.status === 'available' ? '#166534' : location.status === 'busy' ? '#92400e' : '#991b1b';
          const statusBg = location.status === 'available' ? '#dcfce7' : location.status === 'busy' ? '#fef3c7' : '#fee2e2';

          const popupContent = `
            <div style="min-width: 200px; padding: 8px;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937;">${location.name}</h4>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">${location.address}</p>
              
              <div style="margin-bottom: 8px;">
                <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; background-color: ${statusBg}; color: ${statusColor};">
                  ${statusText}
                </span>
              </div>
              
              <div style="font-size: 14px; color: #374151; margin-bottom: 8px;">
                <strong>📞 ${location.phone}</strong>
              </div>
              
              ${distance ? `<div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">📍 ${distance.toFixed(2)} km de distancia</div>` : ''}
              
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">
                <strong>Servicios:</strong><br/>
                ${location.services ? location.services.join(', ') : 'Servicios de emergencia'}
              </div>
              
              <div style="display: flex; gap: 8px;">
                <button onclick="window.open('tel:${location.phone}')" style="padding: 6px 12px; background: #dc2626; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">📞 Llamar</button>
                <button onclick="window.open('https://maps.google.com/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}')" style="padding: 6px 12px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">🧭 Direcciones</button>
              </div>
            </div>
          `;

          window.L.marker([location.coordinates.lat, location.coordinates.lng], { icon: emergencyIcon })
            .addTo(map)
            .bindPopup(popupContent);
        }
      });
    }
  };

  useEffect(() => {
    // Cargar Leaflet dinámicamente
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, emergencyLocations]);

  return (
    <div className={`interactive-map ${className}`} style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <style>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;