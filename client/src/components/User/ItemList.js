import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
const ItemList = (props) => {
    const arr = [1, 2, 3, 4, 5, 6]
    const navigate = useNavigate();
    const openQuestion = () =>{
        navigate(`/questions/${1}`);
    }
    return (
        <div>
            <Row>
                <h5>2,402 {props.text}</h5>
            </Row>
            {
                arr.map((i) => (
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                            <Col sm={2}><text>31 votes</text></Col>
                            <Col><Button style={{backgroundColor:"green", color:"white",marginTop:"-10px"}}>✔{props.text}</Button></Col>
                            </Row>
                            <Row><text onClick={openQuestion}>Creating a function in R with variable number of arguments,</text></Row>
                            <Row>
                            <Col sm={6}><text>tag1 tag2</text></Col>
                            <Col sm={1}></Col>
                            <Col>answered Feb 8, 2018 at 21:02</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default ItemList