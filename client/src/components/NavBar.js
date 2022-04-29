import React from 'react'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import { Form, FormControl, Button, Offcanvas } from 'react-bootstrap'
import { useLocation, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import SideMenu from './Dashboard/DashboardCards/SideMenu'
import logo from './images/stackoverflowlogo.PNG'
import Login from './Login/Login'
import Register from './Register/Register'
const NavBar = () => {
    const location = useLocation()
    const [Flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [registermodal, setregistermodal] = useState(false);
    const [authflag, setauthflag] = useState(true)
    const login = () => {
        setModalShow(true);
    }
    const register = () => {
        setregistermodal(true)
    }
    const logout =() => {
        // dispatch(logoutPending())
        Cookies.remove('token')
    // dispatch(logoutSuccess())
        Cookies.remove('ID')
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
                <Container>
                    <Navbar.Brand href="/DashBoard" ><img style={{ width: "10rem", marginLeft: "-5rem", marginTop: "-1rem", paddingTop: ".5rem" }} src={logo} alt="Flowers in Chania"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col sm={10}>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-1"
                                    aria-label="Search"

                                />
                            </Form>
                        </Col>
                        {
                            authflag ? <Col sm={2}>
                                <Button variant="outline-primary" onClick={login}>Log in</Button>
                                <Button variant="outline-primary" onClick={register}>Sign up</Button>
                            </Col> :
                                <Col sm={3} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                                    <i class="fa-solid fa-user" style={{fontSize:"30px",cursor:"pointer"}}></i>
                                    <i class="fa-solid fa-message" style={{fontSize:"30px",cursor:"pointer"}}></i>
                                    <i class="fa-solid fa-right-from-bracket" style={{fontSize:"30px",cursor:"pointer"}}></i>
                                </Col>


                        }
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <SideMenu />
            <Outlet />

            <Login
                show={modalShow}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
            />

            <Register
                show={registermodal}
                setModalShow={setregistermodal}
                onHide={() => setregistermodal(false)}
            />
        </div>
    )
}

export default NavBar