import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
const BadgeList = (props) => {
  return (
    <div>
      <Row>
        <h5>{props.state.length} {props.text}</h5>
      </Row>
      {
        props.state.map((i) => (
          <Card>
            <div style={{ margin: "1rem" }}>
              <Row>
                <Col sm={2}><text>{i.name}</text></Col>
                <Col></Col>
                <Col sm={1}>{i.score}</Col>
                <Col sm={1}>{i.totalPosts}</Col>
              </Row>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default BadgeList