import React, { useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import img from '../images/santhoshProfPic.jpg'
const Chat = () => {

    // useEffect(async()=>{

    // })

    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col>
                    <Row>
                        <Col sm={1}><img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src={img}></img></Col>
                        <Col sm={3}><h2>UserName</h2></Col>

                    </Row>
                    <Row style={{ marginTop: "2rem" }}>
                        <Card style={{ height: "25rem", width: "38rem" }}>
                            <Row style={{ height: "23rem", width: "38rem" }}></Row>
                            <Row>
                                <Col sm={11}><input style={{ width: "34rem" }}></input>
                                </Col>
                                <Col><i style={{cursor:"pointer"}} class="fa fa-paper-plane" aria-hidden="true"></i></Col>
                            </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Chat