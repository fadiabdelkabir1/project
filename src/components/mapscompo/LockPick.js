import React,{ useEffect,useState } from 'react'
import {Marker,Popup,  useMapEvents} from 'react-leaflet'

function LocationMarker({Position}) {
  const [position, setPosition] = useState(Position)
  const map = useMapEvents({
    click() {
      map.locate()
      },
    locationfound(e) {
      setPosition(Position)
      map.flyTo(Position, map.getZoom())
    },
  })
  useEffect(() => {
    map.flyTo(Position, map.getZoom())
  }, [map,Position])
  
  return (<>{position === null ?    <></> :
  ( <Marker position={position}><Popup>You are here</Popup></Marker> )}</>)
}
export default LocationMarker