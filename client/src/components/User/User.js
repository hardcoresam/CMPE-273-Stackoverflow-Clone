import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import SideMenu from '../Dashboard/DashboardCards/SideMenu';
import profpic from '../images/santhoshProfPic.jpg'
import ProfileSubTab from './ProfileSubTab'
import ActivitySubTab from './ActivitySubTab'
const User = () => {
  const [tabflag, settabflag] = useState(false)
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
        <Col sm={7}>
          <Row style={{ marginTop: "28px", marginLeft: "-30px" }}>
            <Col sm={2}><img style={{ height: "8rem", borderRadius: "8px" }} src={profpic}></img></Col>
            <Col style={{ marginTop: "2rem", marginLeft: "1rem" }}>
              <Row>
                <text style={{ fontSize: "30px" }}>Santhosh Bodla</text>
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
          <h1>Right Side</h1>
        </Col>
      </Row>

    </div>
  )
}

export default User