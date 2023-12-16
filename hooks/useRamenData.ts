import {parse} from 'papaparse'
import {useEffect, useState} from 'react'
import {LatLng} from "leaflet"

type RamenData = {
  latLng: LatLng,
  name: string,
  address: string,
  tel?: string,
}

const useRamenData = () => {
    const [rows, setRows] = useState<RamenData[]>()

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
          setRows(rows) 
        })
    }, [])

  return { ramenData: rows }
}

export default useRamenData
