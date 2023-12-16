import useRamenData from '@/hooks/useRamenData'
import { Marker, Popup, GeoJSON } from 'react-leaflet'
import { Icon, LeafletMouseEvent } from 'leaflet'
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

    const onClick = (e: LeafletMouseEvent) => {
      showCircle(e.latlng)
    }

  return (
    <MapContainer className="map" center={{lat: 34.18583, lng: 131.47139}} zoom={13} style={{width: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {safeCircle && 
        <GeoJSON 
          key={safeCircle.features[0].id}
          data={safeCircle} 
          style={(feature) => {
            let color = "#ffffff"
            if (feature?.properties.level === 1) color = "#550000"
            if (feature?.properties.level === 2) color = "#0000ff"
            if (feature?.properties.level === 3) color = "#00ffff"
            if (feature?.properties.level === 4) color = "#00ff00"
            return {
              weight: 0.0,
              fillColor: color,
              fillOpacity: 0.3,
              color: color,
            }
          }}
        />
      }
      {ramenData && ramenData.map((ramen, index) => {
        return(
          <React.Fragment key={index}>
            <Marker position={ramen.latLng} icon={ramenIcon} eventHandlers={{click: onClick}}>
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
            <Marker position={cultual.latLng} icon={cultualIcon} eventHandlers={{click: onClick}}>
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

