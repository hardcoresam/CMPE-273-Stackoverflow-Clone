import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import questionlogo from '../../images/questionlogo1.PNG'
const AskQuestion = () => {
    return (
        <div style={{ backgroundColor: "#f2f2f2", width: "auto", height: "60rem" }}>
            <Row>
                <Col style={{ marginLeft: "2rem", marginTop: "30px" }}>
                    <text style={{ fontSize: "30px" }}>Ask a public question</text>
                </Col>
                <Col>
                    <img style={{ width: "33rem" }} src={questionlogo}></img>
                </Col>
            </Row>
            <Row>
                <Col style={{ marginLeft: "2rem"}}>
                    <Card style={{width:"53rem"}}>
                        <div style={{ margin: "1rem" , display:"flex", flexDirection:"column"}}>
                            <Card.Title>
                                Title
                            </Card.Title>
                            <text>Be specific and imagine you’re asking a question to another person</text>
                            <input style={{marginBottom :"20px"}}></input>
                            <Card.Title>Body</Card.Title>
                            <text>Include all the information someone would need to answer your question</text>
                            <input style={{height:"10rem"}}></input>

                            <Card.Title>
                                Tags
                            </Card.Title>
                            <text>Add up to 5 tags to describe what your question is about</text>
                            <input></input>
                        </div>
                    </Card>
                    <Button style={{marginTop :"20px"}}>Post your question</Button>
                </Col>
            </Row>
        </div>
    )
}

export default AskQuestion