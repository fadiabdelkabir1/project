import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function HouseType({morefut,editable,setStories,setHouserooms,setHousekitchens,setHousebathrooms,setGardenarea,setHousebalconies,stories,houserooms,housekitchens,housebathrooms,gardenarea,housebalconies}) {

  return (
    <>
    <Row className="mb-3">
        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Stories</Form.Label>
        {editable? <Form.Control onChange={(e)=>setStories(e.target.value)} 
                value={stories} type="number"  />:<p>{morefut.stories}</p>}
        </Form.Group>

        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Rooms</Form.Label>
        {editable? <Form.Control onChange={(e)=>setHouserooms(e.target.value)} 
                value={houserooms} type="number"  />:<p>{morefut.houserooms}</p>}
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Kitchens</Form.Label>
        {editable? <Form.Control onChange={(e)=>setHousekitchens(e.target.value)} 
                value={housekitchens} type="number"  />:<p>{morefut.housekitchens}</p>}
        </Form.Group>

        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Bathrooms</Form.Label>
        {editable? <Form.Control onChange={(e)=>setHousebathrooms(e.target.value)} 
                value={housebathrooms} type="number"  />:<p>{morefut.housebathrooms}</p>}
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Garden Area</Form.Label>
        {editable? <Form.Control onChange={(e)=>setGardenarea(e.target.value)} 
                value={gardenarea} type="number"  />:<p>{morefut.gardenarea}</p>}
        </Form.Group>

        <Form.Group as={Col} >
        <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Balconies</Form.Label>
        {editable? <Form.Control onChange={(e)=>setHousebalconies(e.target.value)} 
                value={housebalconies} type="number"  />:<p>{morefut.housebalconies}</p>}
        </Form.Group>
    </Row>
</>
  )
}

export default HouseType