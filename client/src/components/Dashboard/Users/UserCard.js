import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import pic1 from '../../images/santhoshProfPic.jpg'
import { useNavigate } from 'react-router'
const UserCard = () => {
    const navigate = useNavigate();
    const testuser =12345;
    const openuserProfile = ()=>{
        navigate(`/User/${testuser}`)
    }
    return (
        <Card style={{border:"0", width:"16rem" , marginBottom : "2rem"}}>
            <Row>
                <Col style={{marginRight:"10px"}} sm={3}><img src={pic1} style={{width: "50px", height: "50px", borderRadius:"5px"}}></img></Col>
                <Col style={{marginTop:"-10px"}}>
                    <Row><text onClick={openuserProfile} style={{cursor:"pointer", marginLeft:"-9px"}}>santhosh</text></Row>
                    <Row style={{marginTop:"-5px"}}>California</Row>
                    <Row style={{marginTop:"-5px"}}>910</Row>
                </Col>
            </Row>
            <Row>
        <Col style={{marginRight:"10px"}} sm={2}></Col>
        {//<Col style={{marginTop:"-8px", marginLeft :"4px"}} >tag1,tag2,tag3</Col>
        }
            </Row>
        </Card>
       
    )
}

export default UserCard