import {parse} from 'papaparse'
import {useEffect, useState} from 'react'
import {LatLng} from "leaflet"
import circle from "@turf/circle"
import {FeatureCollection} from 'geojson'
import rhumbDistance from '@turf/rhumb-distance'

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
  minutes: number,
  method: "walking"| "jogging" | "running" | "cycling"
  isHalf: boolean
}


const useRamenData = () => {
    const [ramens, setRamens] = useState<RamenData[]>()
    const [filteredCultuals, setFilteredCultuals] = useState<CultualData[]>()
    const [cultuals, setCultuals] = useState<CultualData[]>()
    const [safeCircle, setSafeCircle] = useState<FeatureCollection>()
    const [radius, setRadius] = useState<{minutes: number, zero: number}>({minutes: 3.0, zero: 3.0})
    const [latLng, setLatLng] = useState<LatLng>()

    useEffect(() => {
      if (latLng === undefined) return
      const circleFeature = circle([latLng.lng, latLng.lat], radius.minutes, {properties: {level: 1}})
      const circleZeroFeature = circle([latLng.lng, latLng.lat], radius.zero, {properties: {level: 2}, steps: 120})
      const id = `${latLng.lat}_${latLng.lng}_${radius.minutes}`
      circleFeature.id = id

      const featureCollection: FeatureCollection = {
        features: [
          circleFeature,
          circleZeroFeature
        ],
        type: 'FeatureCollection',
      }
      setSafeCircle(featureCollection)

      if (cultuals === undefined) return
      const filtered = cultuals.filter(c => isWithinRange(latLng, c.latLng, radius.minutes))
      setFilteredCultuals(filtered)
    }, [radius, latLng, cultuals])

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
      setRadius({minutes: getRadius(input), zero: getZeroCalRadius(input)} )
    }

    const showCircle = (point: LatLng) => {
      setLatLng(point)
    }

    const getZeroCalRadius = (exercise: ExerciseInput) => {
      let mets = 1.0
      if (exercise.method == 'walking') mets = 3.0
      if (exercise.method == 'jogging') mets = 7.0
      if (exercise.method == 'running') mets = 8.3 
      if (exercise.method == 'cycling') mets = 8.0
      const cal = 500
      const minutes = (cal / (60 * mets * 1.05)) * 60
      const r = minutes * getSpeed(exercise) / 1000
      if (exercise.isHalf) return r
      return r / 2
    }

    const getRadius = (exercise: ExerciseInput) => {
      const r = exercise.minutes * getSpeed(exercise) / 1000
      if (exercise.isHalf) return r
      return r / 2
    }

    const getSpeed = (exercise: ExerciseInput) => {
      let speed = 0
      if (exercise.method == 'walking') speed = 67
      if (exercise.method == 'jogging') speed = 106
      if (exercise.method == 'running') speed = 134
      if (exercise.method == 'cycling') speed = 333
      return speed
    }

    const isWithinRange = (from: LatLng, to: LatLng, range: number) => {
      const dist = rhumbDistance([from.lng, from.lat], [to.lng, to.lat]) 
      return dist <= range
    }

  return { ramenData: ramens, cultualData: filteredCultuals, showCircle, safeCircle, setExerciseInput }
}

export default useRamenData
