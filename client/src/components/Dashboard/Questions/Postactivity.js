import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
const Postactivity = () => {
    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col style={{marginRight:"1rem", backgroundColor:"hsl(210deg 8% 85%)"}}>
                    <Row>
                    <Card>
                    <Row>
                    <Col>when toggle format</Col>
                    <Col>what</Col>
                    <Col>by</Col>
                    <Col>comment</Col>
                    </Row>
                    </Card>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Postactivity