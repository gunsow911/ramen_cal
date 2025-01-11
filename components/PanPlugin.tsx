import  {RamenData} from '@/hooks/useRamenData'
import {useMap} from 'react-leaflet'
import React, {useEffect} from 'react'

type Props = {
  toRamen?: RamenData
  onPanStart?: () => void
  onPanEnd?: () => void
}

const PanPlugin = (props: Props) => {
  const map = useMap()
  const duration = 1;

  useEffect(() => {
    if (props.toRamen) {
      props.onPanStart && props.onPanStart()
      map.panTo(props.toRamen.latLng, {
        animate: true,
        duration,
      })
      setTimeout(() => {
        props.onPanEnd && props.onPanEnd()
      }, duration * 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.toRamen])

  return (<></>)
}

export default PanPlugin

