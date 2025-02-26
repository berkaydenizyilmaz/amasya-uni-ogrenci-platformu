'use client';

import { useEffect, useRef } from 'react';

/**
 * Google Maps bileşeni
 * @param {Object} props Component props
 * @param {Function} props.onMapLoad Harita yüklendiğinde çağrılacak fonksiyon
 * @returns {JSX.Element} Harita bileşeni
 */
export default function Map({ onMapLoad }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 40.6550, lng: 35.8330 }, // Amasya merkez
      zoom: 14,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    mapInstanceRef.current = map;
    if (onMapLoad) onMapLoad(map);
  }, [onMapLoad]);

  return <div ref={mapRef} className="w-full h-full" />;
} 