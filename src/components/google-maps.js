'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Google Maps bileşeni
 * @param {Object} props Component props
 * @param {Function} props.onMapLoad Harita yüklendiğinde çağrılacak fonksiyon
 * @returns {JSX.Element} Harita bileşeni
 */
export default function GoogleMaps({ onMapLoad }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || mapInstanceRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
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
  }, [isScriptLoaded, onMapLoad]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onReady={() => setIsScriptLoaded(true)}
        strategy="afterInteractive"
      />
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
} 