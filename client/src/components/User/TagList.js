import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
const TagList = (props) => {
    return (
        <div>
            <Row>
                <h5>2,402 {props.text}</h5>
            </Row>
            <Card>
                <div style={{ margin: "1rem" }}>
                    <Row>
                        <Col sm={2}><text>31 votes</text></Col>
                        <Col></Col>
                        <Col sm={1}>{props.state.score}</Col>
                        <Col sm={1}>{props.state.score}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    )
}

export default TagList