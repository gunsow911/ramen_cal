import useRamenData, {ExerciseInput} from '@/hooks/useRamenData'
import { Marker, Popup, GeoJSON } from 'react-leaflet'
import { Icon, LatLng, LeafletMouseEvent } from 'leaflet'
import React, {useMemo, useState} from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import {iconRamen, iconCultual, iconTourism, iconSpa} from './Icons'
import ExerciseControl from './ExerciseControl'
import {FormProvider, useForm} from 'react-hook-form'
import MarkerClusterGroup from 'react-leaflet-cluster'

const Map = () => {
  const {ramenData, getLocations, getSafeCircle} = useRamenData()
  const [latLng, setLatLng] = useState<LatLng>()
  const ramenIcon = useMemo(() => {
    const icon: Icon = iconRamen
    return icon
  }, [])
  const cultualIcon = useMemo(() => {
    const icon: Icon = iconCultual
    return icon
  }, [])
  const tourismIcon = useMemo(() => {
    const icon: Icon = iconTourism
    return icon
  }, [])
  const spaIcon = useMemo(() => {
    const icon: Icon = iconSpa
    return icon
  }, [])

  const form = useForm<ExerciseInput>({
    reValidateMode: "onSubmit",
    defaultValues: {
      minutes: 30,
      method: "walking",
      isHalf: false,
    }
  })

  form.watch()

  const safeCircle = useMemo(() => {
    return getSafeCircle(latLng, form.getValues())
  }, [getSafeCircle, latLng, form])

  const locations = useMemo(() => {
    return getLocations(latLng, form.getValues())
  }, [getLocations, latLng, form])

  const onClick = (e: LeafletMouseEvent) => {
    setLatLng(e.latlng)
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
            key={safeCircle.features[0]?.id ?? ""}
            data={safeCircle} 
            style={(feature) => {
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
                   <div className='font-semibold'>{ramen.name}</div>
                   <div className='text-xs'>{ramen.address}</div>
                   <div className='text-xs'>
                     {ramen.tel && "電話番号: " + ramen.tel}
                   </div>
                 </div>
                </Popup>
              </Marker>
            </React.Fragment>
            )
          }
        )}
        <MarkerClusterGroup
          showCoverageOnHover={false}
          maxClusterRadius={4}
        >
          {locations.map((location, index) => {
            let icon = undefined
            if (location.type === "cultual") icon = cultualIcon 
            if (location.type === "tourism") icon = tourismIcon 
            if (location.type === "spa") icon = spaIcon
            return(
              <React.Fragment key={index}>
                <Marker position={location.latLng} icon={icon}>
                  <Popup>
                   <div className='pt-2'>
                     <div className='font-semibold'>{location.name}</div>
                     <div className='text-xs'>{location.address}</div>
                     <div className='pt-1'>{location.description}</div>
                   </div>
                  </Popup>
                </Marker>
              </React.Fragment>
              )
            }
          )}
        </MarkerClusterGroup>

        <ExerciseControl />
      </MapContainer>
    </FormProvider>
  )
}

export default Map

