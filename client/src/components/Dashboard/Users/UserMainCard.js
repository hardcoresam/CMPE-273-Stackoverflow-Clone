import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { useState } from 'react'
import Constants from '../../util/Constants.json'
const UserMainCard = () => {
  const arr =[[1,2,3,4],[2,4,4,5]]
  const [userarray, setuserarray] = useState([]);
  // useEffect(async()=>{
  //   Axios.get(`${Constants.uri}/api/users/list`,{
  //     withCredentials : true,
  //     validateStatus: status => status<500
  //   }).then((r)=>{
  //     console.log(r)
  //   })
  // })
  return (
    <div>
    <Row style={{marginBottom:"3rem"}}>
    <Col sm={3}><input placeholder='Filter by user'></input></Col>
    <Col sm={5}></Col>
    
    </Row>
    
{
  arr.map((x)=>(
    <Row>
    {x.map((i)=>(<UserCard />))}
    </Row>
   ))
}
    
    </div>
  )
}

export default UserMainCard