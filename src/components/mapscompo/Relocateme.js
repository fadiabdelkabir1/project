import React from 'react'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
  } from 'react-leaflet'
  
    
function Relocateme() {
    const [Position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
        },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  return (
        <Marker position={Position}  >
            <Popup>You are here</Popup>
        </Marker>
  )
}
export default Relocateme

