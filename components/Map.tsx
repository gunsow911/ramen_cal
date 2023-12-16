import useRamenData from '@/hooks/useRamenData'
import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import React, {useMemo} from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import {iconRamen, iconCultual} from './Icons'

const Map = () => {
  const {ramenData, cultualData, showCircle, safeCircle} = useRamenData()
    const ramenIcon = useMemo(() => {
      const icon: Icon = iconRamen
      return icon
    }, [])
    const cultualIcon = useMemo(() => {
      const icon: Icon = iconCultual
      return icon
    }, [])

  return (
    <MapContainer className="map" center={{lat: 34.18583, lng: 131.47139}} zoom={13} style={{width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ramenData && ramenData.map((ramen, index) => {
          return(
            <React.Fragment key={index}>
              <Marker position={ramen.latLng} icon={ramenIcon}>
                <Popup>
                 <div className='pt-2'>
                   <h2>{ramen.name}</h2>
                   <div>{ramen.address}</div>
                   <div>
                   {ramen.tel && "電話番号: " + ramen.tel}
                   </div>
                 </div>
                </Popup>
              </Marker>
            </React.Fragment>
            )
          }
      )}
      {cultualData && cultualData.map((cultual, index) => {
          return(
            <React.Fragment key={index}>
              <Marker position={cultual.latLng} icon={cultualIcon}>
                <Popup>
                 <div className='pt-2'>
                   <h2>{cultual.name}</h2>
                   <div>{cultual.address}</div>
                   <div>{cultual.caltualType}</div>
                   <div>{cultual.kind}</div>
                 </div>
                </Popup>
              </Marker>
            </React.Fragment>
            )
          }
      )}
    </MapContainer>
  )
}

export default Map

