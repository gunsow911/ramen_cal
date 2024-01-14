"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import 'leaflet/dist/leaflet.css'

export default function MapPage() {
  const MapComponent = React.useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <p>ラーメンマップ準備中…</p>,
        ssr: false,
      }),
    []

  );
  return (
    <main>
      <MapComponent />
    </main>
  )
}
