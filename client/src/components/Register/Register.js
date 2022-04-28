import React from 'react'
import { Card, Row, Col, Modal, Button } from 'react-bootstrap'
import { Alert, Spinner } from 'react-bootstrap'
import { useState } from 'react'
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const registerUser = async () => {

    }
  return (
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Sign up
        </Modal.Title>
    </Modal.Header>
    <Modal.Body className="signmodalbody">
        {//error && <Alert variant="danger">{error}</Alert> 
        }

        <div style={{display:"flex", flexDirection : "column", justifyContent:"space-between", height:"15rem"}}>
        <Row style={{marginTop:"-5px"}}><label for="Email">Display name</label></Row>
        <Row style={{ margin: "1px" }}><input onChange={(e) => {

            setDisplayName(e.target.value)
        }} id="Email" autocomplete="off"></input></Row>

        <Row style={{marginTop:"-5px"}}><label for="Email">Email</label></Row>
        <Row style={{ margin: "1px" }}><input onChange={(e) => {

            setEmail(e.target.value)
        }} id="Email" autocomplete="off"></input></Row>

        <Row><label for="Password">Password</label></Row>
        <Row style={{ margin: "1px" }}><input type="password" onChange={(e) => {
            setPassword(e.target.value)
        }} id="Second Name" autocomplete="off"></input></Row>

        <Row style={{ margin: "1px", marginTop:"7px" }}><Button onClick={registerUser} className="signinButton">Sign up</Button></Row>
        </div>
        

        {//isLoading && <Spinner variant="primary" animation="border"/>
        }


    </Modal.Body>

</Modal>
  )
}

export default Register