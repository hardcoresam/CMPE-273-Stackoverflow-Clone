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
        
    )
}

export default Login