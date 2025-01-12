import {parse} from 'papaparse'
import {useEffect, useState} from 'react'
import {LatLng} from "leaflet"
import circle from "@turf/circle"
import {FeatureCollection} from 'geojson'
import rhumbDistance from '@turf/rhumb-distance'

export type RamenDataHookProps = {
  ramenData?: RamenData[],
  getLocations: (latLng: LatLng | undefined, input: ExerciseInput) => LocationData[],
  getSafeCircle: (latLng: LatLng | undefined, input: ExerciseInput) => FeatureCollection
}

export type RamenData = {
  latLng: LatLng,
  name: string,
  address: string,
  tel?: string,
}

export type LocationData = {
  latLng: LatLng,
  name: string,
  address: string,
  description: string,
  type: "cultual" | "tourism" | "spa"
}

export type SearchInput = {
  query: string
}

export type ExerciseInput = {
  minutes: number,
  method: "walking"| "jogging" | "running" | "cycling"
  isHalf: boolean
}

const useRamenData = (): RamenDataHookProps => {
    const [ramens, setRamens] = useState<RamenData[]>()
    const [locations, setLocations] = useState<LocationData[]>()

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

      const cultures = fetch(`/data/culture.csv`)
        .then(res => res.text())
        .then(text => {
          const results = parse(text ,{
            skipEmptyLines: true,
          })
          const rows = results.data.map<LocationData>((d) => {
            const row = d as any[]
            const latLng = new LatLng(row[6], row[7])
            const name = row[2]
            const address = row[0] + row[1] + row[5]
            const description = row[3] + row[4]
            return {
              name,
              latLng,
              address,
              description,
              type: "cultual",
            }
          })
          return rows
        })

      const tourisms = fetch(`/data/tourism.csv`)
        .then(res => res.text())
        .then(text => {
          const results = parse(text ,{
            skipEmptyLines: true,
          })
          const rows = results.data.map<LocationData>((d) => {
            const row = d as any[]
            const latLng = new LatLng(row[2], row[3])
            const name = row[0]
            const address = row[1]
            const description = row[4]
            return {
              name,
              latLng,
              address,
              description,
              type: "tourism"
            }
          })
          return rows
        })

      const spas = fetch(`/data/spa.csv`)
        .then(res => res.text())
        .then(text => {
          const results = parse(text ,{
            skipEmptyLines: true,
          })
          const rows = results.data.map<LocationData>((d) => {
            const row = d as any[]
            const latLng = new LatLng(row[2], row[3])
            const name = row[0]
            const address = row[1]
            const description = ""
            return {
              name,
              latLng,
              address,
              description,
              type: "spa"
            }
          })
          return rows
        })

        Promise.all([cultures, tourisms, spas]).then((value) => {
          const locations = value.flat(2)
          setLocations(locations)
        })

    }, [])


    const getSafeCircle = (latLng: LatLng | undefined, input: ExerciseInput) => {
      const emptyFeature: FeatureCollection = {
        features: [],
        type: 'FeatureCollection',
      }
      if (latLng === undefined) return emptyFeature
      const minutes = getRadius(input)
      const zero = getZeroCalRadius(input)
      const circleFeature = circle([latLng.lng, latLng.lat], minutes, {properties: {level: 1}})
      const circleZeroFeature = circle([latLng.lng, latLng.lat], zero, {properties: {level: 2}, steps: 120})
      const id = `${latLng.lat}_${latLng.lng}_${minutes}`
      circleFeature.id = id

      const featureCollection: FeatureCollection = {
        features: [
          circleFeature,
          circleZeroFeature
        ],
        type: 'FeatureCollection',
      }
      return featureCollection
    }

    const getLocations = (latLng: LatLng | undefined, input: ExerciseInput) => {
      if (latLng === undefined) return []
      if (locations === undefined) return []
      const minutes = getRadius(input)
      return locations.filter(c => isWithinRange(latLng, c.latLng, minutes))
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

  return { ramenData: ramens, getLocations, getSafeCircle }
}

export default useRamenData
