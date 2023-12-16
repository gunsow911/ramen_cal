import {parse} from 'papaparse'
import {useEffect, useState} from 'react'
import {LatLng} from "leaflet"
import circle from "@turf/circle"
import {Feature, Polygon, FeatureCollection} from 'geojson'

type RamenData = {
  latLng: LatLng,
  name: string,
  address: string,
  tel?: string,
}

type CultualData = {
  latLng: LatLng,
  name: string,
  address: string,
  caltualType: string,
  kind: string,
}

const useRamenData = () => {
    const [ramens, setRamens] = useState<RamenData[]>()
    const [cultuals, setCultuals] = useState<CultualData[]>()
    const [safeCircle, setSafeCircle] = useState<FeatureCollection>()

    useEffect(() => {
      fetch(`/data/ramen.csv`)
        .then(res => res.text())
        .then(text => {
          const results = parse(text ,{
            skipEmptyLines: true,
          })
          const rows = results.data.map<RamenData>((d) => {
            const row = d as any[]
            const latLng = new LatLng(row[5], row[6])
            const name = row[0]
            const address = row[1] + row[2] + row[3]
            const tel = row[4] !== "" ? row[4] : undefined
            return {
              name,
              latLng,
              address,
              tel,
            }
          })
          setRamens(rows) 
        })

      fetch(`/data/culture.csv`)
        .then(res => res.text())
        .then(text => {
          const results = parse(text ,{
            skipEmptyLines: true,
          })
          const rows = results.data.map<CultualData>((d) => {
            const row = d as any[]
            const latLng = new LatLng(row[6], row[7])
            const name = row[2]
            const address = row[0] + row[1] + row[5]
            const caltualType = row[3]
            const kind = row[4]
            return {
              name,
              latLng,
              address,
              caltualType,
              kind,
            }
          })
          setCultuals(rows) 
        })
    }, [])

    const showCircle = (latLng: LatLng) => {
      const circle1Feature = circle([latLng.lng, latLng.lat], 1.0, {properties: {level: 1}})
      const circle2Feature = circle([latLng.lng, latLng.lat], 2.5, {properties: {level: 2}})
      const circle3Feature = circle([latLng.lng, latLng.lat], 4.5, {properties: {level: 3}})
      const circle4Feature = circle([latLng.lng, latLng.lat], 9.0, {properties: {level: 4}})
      const id =  `${latLng.lat}_${latLng.lng}`
      circle1Feature.id = id

      const featureCollection: FeatureCollection = {
        features: [
          circle1Feature,
          circle2Feature,
          circle3Feature,
          circle4Feature,
        ],
        type: 'FeatureCollection',
      }
      setSafeCircle(featureCollection)
    }

  return { ramenData: ramens, cultualData: cultuals, showCircle, safeCircle }
}

export default useRamenData
