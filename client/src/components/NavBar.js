import React from 'react'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import { Form, FormControl, Button, Offcanvas } from 'react-bootstrap'
import { useLocation, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import SideMenu from './Dashboard/DashboardCards/SideMenu'
import logo from './images/stackoverflowlogo.PNG'
import Login from './Login/Login'
import Register from './Register/Register'
import { logoutPending, logoutSuccess } from '../features/logout';
import "react-chat-elements/dist/main.css";
import img from './images/emptyimage.png'
import axios from 'axios'
import Constants from './util/Constants.json'
import { userReducer } from '../features/UserSlice'
const NavBar = () => {
    const userid = Cookies.get("ID");
    const dispatch = useDispatch();
    var navigate = useNavigate();
    const userobject = useSelector(state => state.UserSlice)
    const [photo,setPhoto] = useState("");
    const obj = useSelector(state => state.login)

    const location = useLocation()
    const [Flag, setFlag] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [registermodal, setregistermodal] = useState(false);
    const [authflag, setauthflag] = useState(false)
    const [searchString, setsearchString] = useState("");
    useEffect(() => {
        if (Cookies.get("access-token")) {
            setauthflag(true)
            async function getProfpic() {
                await axios.get(`${Constants.uri}/api/users/${Cookies.get("ID")}/profile`, {
                    withCredentials: true
                }).then((r) => {
                    setPhoto(r.data.photo)
                })
            }
            getProfpic();
        }
        else {
            setauthflag(false)
        }
    }, [location])
    const login = () => {
        setModalShow(true);
    }
    const register = () => {
        setregistermodal(true)
    }
    const logout = () => {
        dispatch(logoutPending())
        Cookies.remove('access-token')
        dispatch(logoutSuccess())
        Cookies.remove('ID')
        navigate("/Dashboard")
    }
    const gotouser = () => {
        navigate(`/User/${userid}`)
    }
    const gotomessages = () => {
        navigate(`/Messages`)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate({
                pathname: '/Dashboard/search',
                search: `?searchString=${searchString}&orderBy=score`
            })
            // navigate(`/Dashboard/search?searchString=${searchString}`);
            // console.log(searchString)
        }
        // console.log(searchString)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
                <Container>
                    <Navbar.Brand href="/DashBoard" ><img style={{ width: "10rem", marginLeft: "-5rem", marginTop: "-1rem", paddingTop: ".5rem" }} src={logo} alt="Flowers in Chania"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col sm={10}>
                            <input
                                style={{ width: "53rem" }}
                                placeholder="Search"
                                aria-label="Search"
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setsearchString(e.target.value)}>

                            </input>

                        </Col>
                        {
                            !Cookies.get("access-token") ? <Col sm={2}>
                                <Button variant="outline-primary" onClick={login}>Log in</Button>
                                <Button variant="outline-primary" onClick={register}>Sign up</Button>
                            </Col> :
                                <Col sm={3} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <img src={photo ? photo : img} style={{ width: "2rem", height: "2rem", borderRadius: "3px", cursor: "pointer" }} onClick={gotouser}></img>
                                    <i class="fa fa-comment-o" aria-hidden="true" style={{ fontSize: "30px", cursor: "pointer" }} onClick={gotomessages}></i>
                                    <Button style={{ border: "0", backgroundColor: "#666666", color: "white" }} onClick={logout}>logout</Button>
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
                setregistermodal={setregistermodal}
                onHide={() => setregistermodal(false)}
            />
        </div>
    )
}

export default NavBar