import React from 'react'
import { Col, Row } from 'react-bootstrap'

const MainCard = () => {
    return (
        <div>
        <div style={{marginTop : "1rem", marginLeft:"45px"}}>
            <Row>
                <Col sm={2} style ={{marginRight : "-3rem"}}>
                    0 votes
                </Col>
                <Col>
                <h5>Join a Table with Condition</h5>
                </Col>
            </Row>
            <Row>
                <Col sm={2} style ={{marginRight : "-2rem", marginLeft : "-1rem"}}>
                    0 answers
                </Col>
                <Col>
                <text>Join a Table with Condition and this is so mych Join a Table with Condition and this is so mych Join a Table with Condition and this is so mych</text>
                </Col>
            </Row>
            <Row>
                <Col sm={2} style ={{marginRight : "-3rem"}}>
                    7 views
                </Col>
                <Col sm={6}>Tag1 Tag2 Tag3</Col>
                <Col>User 3 asked and timestamp</Col>
            </Row>
        </div>
        <hr style={{marginTop : "1rem", marginLeft:"-45px"}}></hr>
        </div>
    )
}

export default MainCard