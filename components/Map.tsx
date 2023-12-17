import useRamenData, {ExerciseInput} from '@/hooks/useRamenData'
import { Marker, Popup, GeoJSON } from 'react-leaflet'
import { Icon, LeafletMouseEvent } from 'leaflet'
import React, {useEffect, useMemo} from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import {iconRamen, iconCultual} from './Icons'
import ExerciseControl from './ExerciseControl'
import {FormProvider, useForm} from 'react-hook-form'

const Map = () => {
  const {ramenData, cultualData, showCircle, safeCircle, setExerciseInput} = useRamenData()
  const ramenIcon = useMemo(() => {
    const icon: Icon = iconRamen
    return icon
  }, [])
  const cultualIcon = useMemo(() => {
    const icon: Icon = iconCultual
    return icon
  }, [])

  const form = useForm<ExerciseInput>({
    reValidateMode: "onChange",
    defaultValues: {
      minutes: 30,
      method: "walking",
      isHalf: false,
    }
  })

  const exerciseInput = form.watch()

  useEffect(() => {
    setExerciseInput(exerciseInput)
  }, [exerciseInput, setExerciseInput])

  const onClick = (e: LeafletMouseEvent) => {
    showCircle(e.latlng)
  }

  return (
    <FormProvider {...form}>
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
              let color = "#0000ff"
              if (feature?.properties.level === 1) {
                return {
                  weight: 0.0,
                  fillColor: "#0000ff",
                  fillOpacity: 0.3,
                }
              }
              if (feature?.properties.level === 2){
                return {
                  weight: 2.0,
                  fillColor: "#ffffff",
                  fillOpacity: 0.0,
                  color: "#ff0000",
                }
              }
              return {
                weight: 0.0,
                fillColor: "#ffffff",
                fillOpacity: 0.3,
                color: "#ffffff",
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
        <ExerciseControl />
      </MapContainer>
    </FormProvider>
  )
}

export default Map

