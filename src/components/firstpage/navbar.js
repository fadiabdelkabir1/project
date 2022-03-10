import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector} from "react-redux";
import LoginModal from "../auth/loginModal";
import RegiterModal from "../auth/registerModal";
import './navbar.css'

export default function NavFct() {
  const isAuth = useSelector((state) => state.auth.isAuth);
//logout
  
  return (
    <div className="Navbar">
      <Navbar className="navbar navbar-expand-sm fixed-top navbar-light" style={{position:"fixed",width:'100%'}} >
        <Container >
          <Navbar.Brand id="hme"href="#home">
            <p>K e r i t y</p>
            <hr/>
          </Navbar.Brand>
          <Nav className="me-auto justify-content-between">
            {  isAuth? <></>:visitorLinks   }
            
          </Nav>
        </Container>
      </Navbar>
      
    </div>
  );
}

const visitorLinks = (
  <>
    <LoginModal />
    <RegiterModal />
  </>
);
