import React from 'react'
import { Card, Row, Col, Modal, Button } from 'react-bootstrap'
import { Alert, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import Constants from '../util/Constants.json'
import { useSelector, useDispatch } from 'react-redux';
import {loginSuccess, loginFail, loginPending} from './../../features/login'
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const obj = useSelector(state => state.login)
    const {isLoading,isAuth,error} = obj.value

    const signInUser = async () => {
        dispatch(loginPending())
        Axios.post(`${Constants.uri}/api/users/login`,{
            email : email,
            password : password
          },{
            withCredentials : true,
            validateStatus: status => status<500
          }).then((r)=>{
            if(r.status===200){
            dispatch(loginSuccess())
              props.setModalShow(false)
              if(r.data.member.is_admin)
              navigate('/AdminDashBoard')
              else
              window.location.reload()
            }
            else{
              dispatch(loginFail(r.data.message.errors.email.msg))
            }
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
                    Log in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="signmodalbody">
                {error && <Alert variant="danger">{error}</Alert> 
                }

                <div style={{display:"flex", flexDirection : "column", justifyContent:"space-between", height:"11rem"}}>
                <Row style={{marginTop:"-5px"}}><label for="Email">Email</label></Row>
                <Row style={{ margin: "1px" }}><input onChange={(e) => {

                    setEmail(e.target.value)
                }} id="Email" ></input></Row>

                <Row><label for="Password">Password</label></Row>
                <Row style={{ margin: "1px" }}><input type="password" onChange={(e) => {
                    setPassword(e.target.value)
                }} id="Second Name" ></input></Row>

                <Row style={{ margin: "1px", marginTop:"7px" }}><Button onClick={signInUser} className="signinButton">Log in</Button></Row>
                </div>
                

                {isLoading && <Spinner variant="primary" animation="border"/>
                }


            </Modal.Body>

        </Modal>
    )
}

export default Login