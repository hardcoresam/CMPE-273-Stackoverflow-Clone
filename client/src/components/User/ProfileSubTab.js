import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const ProfileSubTab = () => {
  return (
    <div>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <h3>Stats</h3>
                    <Card style={{width:"16rem", height:"9rem"}}>
                        <Card.Body>
                            <Row>
                                <Col sm={6}>
                                    <Row>1</Row>
                                    <Row>reputation</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>0</Row>
                                    <Row>reached</Row>
                                </Col>
                            </Row>
                            <Row style={{marginTop:"1rem"}}>
                                <Col sm={6}>
                                    <Row>1</Row>
                                    <Row>answers</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>1</Row>
                                    <Row>questions</Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={2}></Col>
                <Col sm={3} style={{marginLeft:"-2rem"}}>
                    <h3>About</h3>
                    <Card style={{width:"43rem", height:"7rem", backgroundColor:"MintCream"}}>
                        <Card.Body>
                            <Row>
                                <text>Your about me section is currently blank. Would you like to add one? Edit profile</text>
                            </Row>  
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <h3>Communities</h3>
                    <Card style={{width:"16rem", height:"4rem"}}>
                        <Card.Body>
                            Stackoverflow
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={2}></Col>
                <Col sm={3} style={{marginLeft:"-2rem"}}>
                    <h3>Badges</h3>
                    <Card style={{width:"43rem", height:"7rem", backgroundColor:"MintCream"}}>
                        <Card.Body>
                            <Row>
                                <text>You have not earned any badges.</text>
                            </Row>  
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default ProfileSubTab