import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function CommStore({setBackOffice,setCommfloor,setBackdoor,setDisplaywindow,setCommelevator,setCommentries}) {

  return (
    <>
        <Row className="mb-3">
        <Form.Group as={Col} >
            <Form.Label>Has BackOffice</Form.Label>
            <Form.Select defaultValue="Yes"  onChange={(e)=>setBackOffice(e.target.value)} >
                <option>Yes</option>
                <option>No</option>
            </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Floor Number</Form.Label>
            <Form.Control type="number" placeholder="0" onChange={(e)=>setCommfloor(e.target.value)}/>
            </Form.Group>
            
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
                <Form.Label>Has BackDoor</Form.Label>
                <Form.Select defaultValue="Yes" onChange={(e)=>setBackdoor(e.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Display Window</Form.Label>
            <Form.Control type="number" placeholder="1" onChange={(e)=>setDisplaywindow(e.target.value)}/>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label>Has Elevator</Form.Label>
            <Form.Select defaultValue="Yes" onChange={(e)=>setCommelevator(e.target.value)}>
                <option>Yes</option>
                <option>No</option>
            </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label>Number of Entries</Form.Label>
            <Form.Control type="number" placeholder="1" onChange={(e)=>setCommentries(e.target.value)}/>
            </Form.Group>
        </Row>
</>
  )
}

export default CommStore