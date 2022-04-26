import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import pic1 from '../../images/santhoshProfPic.jpg'
const UserCard = () => {
    return (
        <Card style={{border:"0", width:"16rem" , marginBottom : "2rem"}}>
            <Row>
                <Col style={{marginRight:"10px"}} sm={3}><img src={pic1} style={{width: "50px", height: "50px", borderRadius:"5px"}}></img></Col>
                <Col style={{marginTop:"-10px"}}>
                    <Row>santhosh</Row>
                    <Row style={{marginTop:"-5px"}}>California</Row>
                    <Row style={{marginTop:"-5px"}}>910</Row>
                </Col>
            </Row>
            <Row>
        <Col style={{marginRight:"10px"}} sm={2}></Col>
        <Col style={{marginTop:"-8px", marginLeft :"4px"}} >tag1,tag2,tag3</Col>
            </Row>
        </Card>
       
    )
}

export default UserCard