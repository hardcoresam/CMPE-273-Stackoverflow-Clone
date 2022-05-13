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

       


    </Modal.Body>

</Modal>
  )
}

export default Register