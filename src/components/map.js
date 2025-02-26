'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

/**
 * Harita bileşeni
 * @param {Object} props Component props
 * @param {Object} props.route Rota bilgileri
 * @returns {JSX.Element} Harita bileşeni
 */
export default function Map({ route }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    // Eğer harita henüz oluşturulmadıysa oluştur
    if (!mapInstanceRef.current && mapRef.current) {
      // Leaflet ikonlarını düzelt
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Haritayı başlat
      mapInstanceRef.current = L.map(mapRef.current).setView([40.6550, 35.8330], 14);

      // Harita layer'ını ekle
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Rota varsa çiz
    if (route && mapInstanceRef.current) {
      // Önceki katmanları temizle
      layersRef.current.forEach(layer => layer.remove());
      layersRef.current = [];

      // Durakları işaretle
      route.stops.forEach(stop => {
        const marker = L.marker(stop.location)
          .bindPopup(stop.name)
          .addTo(mapInstanceRef.current);
        layersRef.current.push(marker);
      });

      // Güzergahı çiz
      const polyline = L.polyline(route.path, { color: 'blue' })
        .addTo(mapInstanceRef.current);
      layersRef.current.push(polyline);

      // Güzergahı görüntüle
      mapInstanceRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        layersRef.current.forEach(layer => layer.remove());
        layersRef.current = [];
      }
    };
  }, [route]);

  // Harita instance'ını temizle
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg" 
      style={{ minHeight: '500px' }}
    />
  );
} 