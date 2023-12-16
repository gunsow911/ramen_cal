import useRamenData from '@/hooks/useRamenData'
import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import {iconRamen} from './Icons'

const Map = () => {
  const {ramenData} = useRamenData()

  return (
    <MapContainer className="map" center={{lat: 34.18583, lng: 131.47139}} zoom={13} style={{width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ramenData && ramenData.map((ramen, index) => {
          const icon: Icon = iconRamen
          return(
            <React.Fragment key={index}>
              <Marker position={ramen.latLng} icon={icon}>
              </Marker>
            </React.Fragment>
            )
          }
      )}
    </MapContainer>
  )
}

export default Map

