'use client';

import { SessionProvider } from "next-auth/react";

/**
 * Client tarafı providers
 * @param {Object} props - Bileşen props'ları
 * @param {React.ReactNode} props.children - Alt bileşenler
 * @returns {JSX.Element} Providers bileşeni
 */
export default function Providers({ children }) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
} 