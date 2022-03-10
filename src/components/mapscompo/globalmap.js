import React, { useEffect, useState } from 'react'
import {MapContainer,TileLayer,Marker,Popup, Circle} from "react-leaflet"
import inof from './inof';
import './globalmap.css'
import "leaflet/dist/leaflet.css";
import useGeoLocation from './useGeoLocation';
import L from 'leaflet';
import Propmarkers from './Propmarkers';
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import FormRange from 'react-bootstrap/esm/FormRange';
import LocationPicker from "react-leaflet-location-picker";
import LocationMarker from './LockPick';



function Globalmap() {
    const location =useGeoLocation()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [Relocateme, setRelocateme] = useState(false)
    const [Max, setMax] = useState(9000)
    const [Min, setMin] = useState(0)
    const [Lat, setLat] = useState()
    const [Position, setPosition] = useState(null)
    const [Lng, setLng] = useState()
    const [RadiusValue, setRadiusValue] = useState(1000)
    const [PrimaryLocation, setPrimaryLocation] = useState()
    const [Proptype, setProptype] = useState("All")
    const [center, setCenter] = useState()
    const zoom_level=13;
    useEffect(()=>{
        setCenter({lat:location.coordinates.lat,lng:location.coordinates.lng})
        setPrimaryLocation({lat:location.coordinates.lat,lng:location.coordinates.lng})
        setLat(location.coordinates.lat)
        setLng(location.coordinates.lng)
    },[location.coordinates,Position])
    function ManualLocation(){
        setCenter({lat:Lat,lng:Lng})
        setPosition({lat:Lat,lng:Lng})

    }
    function Relocate(){
        setPosition(PrimaryLocation)
        setCenter(PrimaryLocation)
    }
    if(RadiusValue<10){setRadiusValue(10)}
        const [PickerLat, setPickerLat] = useState(Lat)
        const [PickerLng, setPickerLng] = useState(Lng)
    const pointVals = [[Lat, Lng]];
    const pointMode = {
    banner: true,
    control: {
        values: pointVals,
        onClick: point =>
        {setPickerLat(point[0]);setPickerLng(point[1]) }
    }
    };
    const circleMode = {
    banner: false
    };
  //
    return (
    <div className='mapcontainer'>
        {location.coordinates.lat? <MapContainer  center={{lat:location.coordinates.lat,lng:location.coordinates.lng}}  zoom={zoom_level}  >
    <TileLayer url={inof.maptiler.url} attribution={inof.maptiler.attribution}></TileLayer>
    <Propmarkers Max={Max} Min={Min} Proptype={Proptype} PrimaryLocation={PrimaryLocation} RadiusValue={RadiusValue} />
        <Circle center={center} color={"red"} radius={RadiusValue}  min={10} ></Circle>
            {Position==null? <Marker position={PrimaryLocation}  ><Popup>You are here</Popup></Marker>:<LocationMarker   Position={Position} />} 
        </MapContainer>:<></>}
        <div className="d-md-flex flex-md-row justify-content-between" style={{paddingTop:"15px"}} >
                <Form className="p-2" style={{marginLeft:"auto",marginRight:"auto"}}>
                    <Form.Group   >
                    <Form.Label style={{fontSize:"15px",color:"#5c5d61"}} >Radius Range : {RadiusValue/1000}Km</Form.Label>
                    <FormRange style={{marginTop:"5px"}} value={RadiusValue} onChange={(e)=>setRadiusValue(e.target.value)} max="50000" />
                    </Form.Group>
                </Form>
            
            <Form className="p-2" style={{marginLeft:"auto",marginRight:"auto"}}>
            <Form.Label style={{fontSize:"15px",color:"#5c5d61"}} >Dwelling Type</Form.Label>
                <Form.Select defaultValue="All"  onChange={(e)=>setProptype(e.target.value)}  >
                    <option value="All">All</option>
                    <option value="House">House</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Commercial Store">Commercial Store</option>
                </Form.Select>
            </Form>

            <Form className="p-2" style={{marginLeft:"auto",marginRight:"auto"}}>
                    <Form.Label style={{fontSize:"15px",color:"#5c5d61"}} >Min-Max Price</Form.Label>
                    <InputGroup >
                        <FormControl defaultValue={Min} onChange={(e)=>setMin(e.target.value)} style={{fontSize:"15px",color:"#5c5d61"}}  />
                        <FormControl defaultValue={Max} onChange={(e)=>setMax(e.target.value)} style={{fontSize:"15px",color:"#5c5d61"}}  />
                    </InputGroup>
            </Form>
            <Form className="p-2" style={{marginLeft:"auto",marginRight:"auto"}} >
                    <Form.Label style={{fontSize:"15px",color:"#5c5d61"}} >Change Location: Lat-Lng</Form.Label>
                    <InputGroup >
                        <FormControl  defaultValue={Lat} onChange={(e)=>setLat(e.target.value)} style={{fontSize:"15px",color:"#5c5d61"}}  />
                        <FormControl  defaultValue={Lng} onChange={(e)=>setLng(e.target.value)} style={{fontSize:"15px",color:"#5c5d61"}}  />
                        <Button variant="outline-secondary" style={{maxWidth:"25%"}} id="button-addon1" onClick={ManualLocation}>Change</Button>
                        <Button variant="outline-secondary" style={{maxWidth:"25%"}} id="button-addon1" onClick={Relocate}>Relocate</Button>
                        <Button variant="outline-secondary" style={{maxWidth:"25%"}} id="button-addon1" onClick={handleShow}>Pick on Map</Button>
                    </InputGroup>
            </Form>
            <Modal show={show}>
                <Modal.Header closeButton>
                <Modal.Title>Pick Your Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <LocationPicker  pointMode={pointMode} circleMode={circleMode} style={{width:"600px !impotant",height:"400px !impotant"}}/>
                </Modal.Body>
                <Modal.Footer>
                <Button id="closeButton" variant="primary" onClick={(e)=> {setShow(false)}}>Close Modal</Button>
                <Button id="UpdateButton" variant="primary" onClick={(e)=> {setCenter({lat:PickerLat,lng:PickerLng});setPosition({lat:PickerLat,lng:PickerLng}); setShow(false)}}>Update Location</Button>
                </Modal.Footer>
            </Modal>
        </div>
  </div>
  )
}

export default Globalmap