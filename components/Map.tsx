import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'

const Map = () => {
  return (
    <MapContainer className="map" center={{lat: 34.18583, lng: 131.47139}} zoom={13} style={{width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map

