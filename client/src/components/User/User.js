import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import SideMenu from '../Dashboard/DashboardCards/SideMenu';
import profpic from '../images/santhoshProfPic.jpg'
import ProfileSubTab from './ProfileSubTab'
import ActivitySubTab from './ActivitySubTab'
import Axios from 'axios'
// import Constants from "../util/Constants.json"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userReducer } from '../../features/UserSlice';
const User = () => {
  const obj = useSelector(state => state.UserSlice)
  const {username} = obj.value
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [tabflag, settabflag] = useState(false)


  useEffect(()=>{
    // await Axios.get(`${Constants.uri}/api/users/prodile/${userid}`,{
    //   withCredentials: true
    // }).then((r) => {
    
    // })

    dispatch(userReducer({
      email: "santhosh@gmail.com",
      username: "lalitha",
  }))
  })



  const profileSubTab = () => {
    settabflag(true)
  }

  const activitySubTab = () => {
    settabflag(false)
  }
  return (
    <div>
      <Row>
        <Col sm={2}>
          <SideMenu />
        </Col>
        <Col sm={8}>
          <Row style={{ marginTop: "28px", marginLeft: "-30px" }}>
            <Col sm={2}><img style={{ height: "8rem", borderRadius: "8px" }} src={profpic}></img></Col>
            <Col style={{ marginTop: "2rem", marginLeft: "1rem" }}>
              <Row>
                <text style={{ fontSize: "30px" }}>{username}</text>
              </Row>
              <Row>
                <text>Member for 1 year</text>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col sm={1}><Button variant="warning" className='rounded-pill' onClick={profileSubTab}>Profile</Button></Col>
            <Col sm={1}></Col>
            <Col sm={1} style={{ marginLeft: "-2rem" }}><Button variant="warning" className='rounded-pill' onClick={activitySubTab}>Activity</Button></Col>
          </Row>
        <Row>
        {tabflag ? <ProfileSubTab /> : <ActivitySubTab />}
        </Row>
        </Col>
        <Col sm={2}>
          <Button style={{marginTop : "28px", color:"Black", borderColor:"black"}} variant='outline-light'>Edit Profile</Button>
        </Col>
      </Row>

    </div>
  )
}

export default User