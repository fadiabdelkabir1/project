import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function AppType({morefut,editable,setFloor,floor,setKitchens,kitchens,setBalconies,balconies,setBathrooms,bathrooms,setRooms,rooms,setElevator,elevator}) {

  return (
    <>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Floor Number</Form.Label>
                {editable? <Form.Control onChange={(e)=>setFloor(e.target.value)} 
                value={floor} type="number"  />:<p>{morefut.floor}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Rooms</Form.Label>
            {editable? <Form.Control onChange={(e)=>setRooms(e.target.value)} 
                value={rooms} type="number"  />:<p>{morefut.rooms}</p>}
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Kitchens</Form.Label>
            {editable? <Form.Control onChange={(e)=>setKitchens(e.target.value)} 
                value={kitchens} type="number"  />:<p>{morefut.kitchens}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Bathrooms</Form.Label>
            {editable? <Form.Control onChange={(e)=>setBathrooms(e.target.value)} 
                value={bathrooms} type="number"  />:<p>{morefut.bathrooms}</p>}
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Has Elevator</Form.Label>
            {editable? (<Form.Select onChange={(e)=>setElevator(e.target.value)} >
            {(morefut.Elevator==="Yes")? 
            (elevifyes.map(elv=><option key={elv+1} >{elv}</option>)):
            (elevifno.map(elv=><option key={elv+2} >{elv}</option>))}
            </Form.Select>):
            <p>{morefut.elevator}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Balconies</Form.Label>
            {editable? <Form.Control onChange={(e)=>setBalconies(e.target.value)} 
                value={balconies} type="number"  />:<p>{morefut.balconies}</p>}
            </Form.Group>
        </Row>
    </>
  )
}

export default AppType

const elevifyes=["Yes","No"]
const elevifno=["No","Yes"]