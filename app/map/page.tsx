"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import 'leaflet/dist/leaflet.css'
import Loading from '@/components/Loading';

export default function MapPage() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <Loading/>,
        ssr: false,
      }),
    []

  );
  return (
    <main>
      <Map />
    </main>
  )
}
