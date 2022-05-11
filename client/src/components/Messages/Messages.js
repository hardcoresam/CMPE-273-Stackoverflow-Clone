import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import img from '../images/santhoshProfPic.jpg'
import messageimg from '../images/message.png'
import { useNavigate } from 'react-router'
const Messages = () => {
    const navigate = useNavigate();
    const arr = [1, 2, ,6,7,7,3];
    const openUserMessageBox = (id)=>{
        navigate(`/messages/chat/${"2"}`)
    }
    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col>
                    <Row>
                    <Col></Col>
                    <Col><h3>Messages</h3></Col>
                    <Col></Col>
                    </Row>
                    {arr.map(i=>(<Card style={{cursor:"pointer"}} onClick={openUserMessageBox}>
                        <Card.Body>
                            <Row>
                                <Col sm={3}><img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src={img}></img></Col>
                                <Col><h4>sai Krishna</h4></Col>
                            </Row>
                        </Card.Body>
                    </Card>))}

                </Col>
                <Col sm={6}>
                <img style={{width:"38rem", height:"auto"}} src= {messageimg}></img>
                </Col>
            </Row>
        </div>
    )
}

export default Messages