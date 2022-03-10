import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'


const House=({setStories,setHouserooms,setHousekitchens,setHouseBathrooms,setGardenarea,setHousebalconies})=> {




  return (
      <>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Number of Stories</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={(e)=>setStories(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Rooms</Form.Label>
            <Form.Control type="number" placeholder="100£"  onChange={(e)=>setHouserooms(e.target.value)} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Number of Kitchens</Form.Label>
            <Form.Control type="number" placeholder="1" onChange={(e)=>setHousekitchens(e.target.value)}  />
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Bathrooms</Form.Label>
            <Form.Control type="number" placeholder="1"  onChange={(e)=>setHouseBathrooms(e.target.value)} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Garden Area</Form.Label>
            <Form.Control type="number" placeholder="0m²"  onChange={(e)=>setGardenarea(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Balconies</Form.Label>
            <Form.Control type="number" placeholder="0"  onChange={(e)=>setHousebalconies(e.target.value)}  />
            </Form.Group>
        </Row>
    </>
  )
}

export default House
