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

export type ExerciseInput = {
  power: "high" | "low",
  method: "walking" | "jogging" | "cycling"
}


const useRamenData = () => {
    const [ramens, setRamens] = useState<RamenData[]>()
    const [cultuals, setCultuals] = useState<CultualData[]>()
    const [safeCircle, setSafeCircle] = useState<FeatureCollection>()
    const [radius, setRadius] = useState<number>(3.0)
    const [latLng, setLatLng] = useState<LatLng>()

    useEffect(() => {
      if (latLng === undefined) return
      const circle1Feature = circle([latLng.lng, latLng.lat], radius / 4.0, {properties: {level: 1}})
      const circle2Feature = circle([latLng.lng, latLng.lat], radius / 2.0, {properties: {level: 2}})
      const circle3Feature = circle([latLng.lng, latLng.lat], radius, {properties: {level: 3}})
      const id =  `${latLng.lat}_${latLng.lng}_${radius}`
      circle1Feature.id = id

      const featureCollection: FeatureCollection = {
        features: [
          circle1Feature,
          circle2Feature,
          circle3Feature,
        ],
        type: 'FeatureCollection',
      }
      setSafeCircle(featureCollection)
    }, [radius, latLng])

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

    const setExerciseInput = (input: ExerciseInput) => {
      setRadius(getRadius(input))
    }

    const showCircle = (point: LatLng) => {
      setLatLng(point)
    }

    const getRadius = (exercise: ExerciseInput) => {
      if (exercise.power === "high") return 4.5
      if (exercise.power === "low") return 3.0
      return 3.0
    }

  return { ramenData: ramens, cultualData: cultuals, showCircle, safeCircle, setExerciseInput }
}

export default useRamenData
