"use client";
import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';
import 'leaflet/dist/leaflet.css'
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import {RamenData} from '@/hooks/useRamenData';

export default function MapPage() {
  const [open, setOpen] = React.useState(false);
  const [ramenData, setRamenData] = React.useState<RamenData[]>();
  const [value, setValue] = React.useState<string>("");
  const [ramen, setRamen] = React.useState<RamenData>();
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <Loading/>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    if (open) {
      setValue("")
    }
  }, [open])

  const onSearch = (ramen: RamenData) => {
    setRamen(ramen);
    setOpen(false);
  }

  return (
    <main>
      <div className='relative h-screen'>
        <Sidebar open={open} onClose={() => setOpen(false)}>
          <Search value={value} onValueChange={(v) => setValue(v)} ramenData={ramenData} onSearch={onSearch} />
        </Sidebar>
        <div className='h-hull'>
          <Map onSearchToggle={() => setOpen(true)} onLoadRamenData={setRamenData} toRamen={ramen} />
        </div>
      </div>
    </main>
  )
}
