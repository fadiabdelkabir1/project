import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function Appartement({ setFloor,setRooms,setKitchens,setBathrooms,setElevator,setBalconies }) {

    
  return (
    <>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Floor Number</Form.Label>
            <Form.Control type="number" onChange={(e)=>setFloor(e.target.value)} placeholder="0" />
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Rooms</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={(e)=>setRooms(e.target.value)} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Number of Kitchens</Form.Label>
            <Form.Control type="number" placeholder="1"  onChange={(e)=>setKitchens(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Bathrooms</Form.Label>
            <Form.Control type="number" placeholder="1" onChange={(e)=>setBathrooms(e.target.value)} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Has Elevator</Form.Label>
            <Form.Select defaultValue="Yes" onChange={(e)=>setElevator(e.target.value)}>
                <option>Yes</option>
                <option>No</option>
            </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Balconies</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={(e)=>setBalconies(e.target.value)} />
            </Form.Group>
        </Row>
    </>
  )
}

export default Appartement