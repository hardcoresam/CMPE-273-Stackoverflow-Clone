import React from 'react'
import { Card, Row, Col, Modal, Button } from 'react-bootstrap'
import { Alert, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import Axios from 'axios'
import Constants from '../util/Constants.json'
import { useNavigate } from 'react-router'
const Register = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const registerUser = async () => {
         await Axios.post(`${Constants.uri}/api/users/register`, {
            email: email,
            displayName: displayName,
            password: password
          }, {
            withCredentials: true,
            validateStatus: status => status < 500
          }).then((r) => {
            if (r.status === 200) {
            //   dispatch(registerSuccess())
            props.setregistermodal(false)
              navigate('/DashBoard')
            }
            else {
              if (r.status === 401){

              }
                // dispatch(registerFail(r.data.errors[0].param+" " + r.data.errors[0].msg))
              else{
                  
              }
                // dispatch(registerFail(r.data.message.msg))
            }
          }).catch((err) => {
            //   dispatch(registerFail(err.data.message.msg))
          })
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
        }} id="Email" ></input></Row>

        <Row style={{marginTop:"-5px"}}><label for="Email">Email</label></Row>
        <Row style={{ margin: "1px" }}><input onChange={(e) => {

            setEmail(e.target.value)
        }} id="Email" ></input></Row>

        <Row><label for="Password">Password</label></Row>
        <Row style={{ margin: "1px" }}><input type="password" onChange={(e) => {
            setPassword(e.target.value)
        }} id="Second Name" ></input></Row>

        <Row style={{ margin: "1px", marginTop:"7px" }}><Button onClick={registerUser} className="signinButton">Sign up</Button></Row>
        </div>
        

        {//isLoading && <Spinner variant="primary" animation="border"/>
        }


    </Modal.Body>

</Modal>
  )
}

export default Register