import React from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { registerHandler } from "../../redux/actions/auth-action";

export default function Example() {
  //manipulate the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //local states to get the payload data from the user
  const [fullname, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [usertype,setUsertype]=useState("")
  //dispatch the action (send a request)
  const dispatch = useDispatch();
  const registerUser = (e) => {
      e.preventDefault()
    const newUser = { fullname, email,phone, password,usertype };
    dispatch(registerHandler(newUser));
    handleClose()
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        SignUp
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.<br/>
              </Form.Text>
              <Form.Label>
                Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="123..."
                onChange={(wsx) => setPhone(wsx.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
              
              <input type="radio" value="Landlord" onChange={(e)=>setUsertype(e.target.value)} name="Landlord" style={{margin:'15px'}}/> Landlord
              <input type="radio" value="Loaner" onChange={(e)=>setUsertype(e.target.value)} name="Loaner" style={{margin:'15px'}}/> Loaner
            </Form.Group>
            <Button variant="secondary" id='submit' type="submit" onClick={registerUser}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
