import React from 'react';
import 'leaflet/dist/leaflet.css'
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose?: () => void
  children?: React.ReactNode
}

export default function Sidebar(props: Props) {
  return (
    <div
      className={`
        border-solid border-2 border-black/20
        fixed z-[2000] top-0 left-0 h-full bg-white transition-transform duration-300 ${
        props.open ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "300px" }}
    >
      <div className="flex justify-end">
        <div onClick={props.onClose} role="button" className="mr-2 mt-2" >
          <Image src="/icons/close.png" alt="search" width={20} height={20} /> 
        </div>
      </div>
      <div className="mx-2">
        {props.children}
      </div>
    </div>
  )
}
