import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function CommType({morefut,editable,setBackOffice,BackOffice,setCommfloor,Commfloor,setBackdoor,Backdoor,setDisplaywindow,Displaywindow,setCommelevator,Commelevator,setCommentries,Commentries}) {
  return (
    <>
        <Row className="mb-3">
        <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Has BackOffice</Form.Label>
            {editable? (<Form.Select onChange={(e)=>setBackOffice(e.target.value)} >
            {(morefut.BackOffice==="Yes")? 
            (ifyes.map(elv=><option key={elv+1} >{elv}</option>)):
            (ifno.map(elv=><option key={elv+2} >{elv}</option>))}
            </Form.Select>):
            <p>{morefut.BackOffice}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Floor Number</Form.Label>
            {editable? <Form.Control onChange={(e)=>setCommfloor(e.target.value)} 
                value={Commfloor} type="number"  />:<p>{morefut.Commfloor}</p>}
            </Form.Group>
            
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Has BackDoor</Form.Label>
                {editable? (<Form.Select onChange={(e)=>setBackdoor(e.target.value)} >
            {(morefut.Backdoor==="Yes")? 
            (ifyes.map(elv=><option key={elv+3} >{elv}</option>)):
            (ifno.map(elv=><option key={elv+4} >{elv}</option>))}
            </Form.Select>):
            <p>{morefut.Backdoor}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Display Window</Form.Label>
            {editable? <Form.Control onChange={(e)=>setDisplaywindow(e.target.value)} 
                value={Displaywindow} type="number"  />:<p>{morefut.Displaywindow}</p>}
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Has Elevator</Form.Label>
            {editable? (<Form.Select onChange={(e)=>setCommelevator(e.target.value)} >
            {(morefut.Commelevator==="Yes")? 
            (ifyes.map(elv=><option key={elv+5} >{elv}</option>)):
            (ifno.map(elv=><option key={elv+6} >{elv}</option>))}
            </Form.Select>):
            <p>{morefut.Commelevator}</p>}
            </Form.Group>

            <Form.Group as={Col} >
            <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Number of Entries</Form.Label>
            {editable? <Form.Control onChange={(e)=>setCommentries(e.target.value)} 
                value={Commentries} type="number"  />:<p>{morefut.Commentries}</p>}
            </Form.Group>
        </Row>
</>
  )
}

export default CommType



const ifyes=["Yes","No"]
const ifno=["No","Yes"]