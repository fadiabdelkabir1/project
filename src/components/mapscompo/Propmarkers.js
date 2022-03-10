import React, { useEffect, useState } from 'react'
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { getAlloffers } from '../../redux/actions/poste-action';
import {Marker,Popup} from "react-leaflet"
import { Button } from 'react-bootstrap';
import './Propmarkers.css'
import { Link } from "react-router-dom";
import calcDist from './distfunction';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
function Propmarkers({Max,Min,Proptype,PrimaryLocation,RadiusValue}) {
    const dispatch= useDispatch()
    useEffect(() => {
        dispatch(getAlloffers())
    }, []);
    const postes = useSelector((state) => state.postinfo.postes);
    var filtredpostes=postes
    function filterpostes(){
        if(!(Proptype==="All")){
            filtredpostes=postes.filter(item=>item.type===Proptype & Max>Number(item.price) & Number(item.price)>Min)}        
            return filtredpostes
        }
    filterpostes()
    var finalpostelist;
    const MarkerList=[]
    function verifyradius(){

        finalpostelist=filtredpostes.map(item=>
            MarkerList.push({poste:item,coords:[item.coordinates.lat,item.coordinates.lng],check:calcDist(PrimaryLocation,item.coordinates,RadiusValue)})
            )
    }
    verifyradius() 
    return (
    <div>
        {postes?   MarkerList.map((poste)=> 
        poste.check.isInRadious? (<Marker position={poste.coords} key={poste.poste._id} >
            <Popup className='heresthtosee'  ><div className='infocontainer'>
                <div className='texcontainer'>{poste.poste.title}, {poste.poste.price}DT</div>
                <div><Link  to={`/offerpage/${poste.poste._id}`}><Button className='visitbutton' variant="primary"> Visit</Button></Link></div>
            </div>
            
            </Popup>
        </Marker>):<></>  ):<></> } 
    </div>
    )
}

export default Propmarkers