import React,{ useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

function LocationMarker({center,Position}) {
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
console.log(position,Position)
  return (<>{position === null ?    <></> :
  ( <Marker position={position}><Popup>You are here</Popup></Marker> )}</>)
}
export default LocationMarker