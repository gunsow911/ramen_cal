"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import 'leaflet/dist/leaflet.css'

export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/Map"), {
        loading: () => <p>マップロード中…</p>,
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
