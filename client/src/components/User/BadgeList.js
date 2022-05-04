import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
const BadgeList = (props) => {
  return (
    <div>
      <Row>
        <h5>{props.state.length} {props.text}</h5>
      </Row>
      {
        props.state.map((array) => (
          <Row>
            {array.map((obj) => (

              <Card style={{ width: "auto" , marginRight:"3rem", marginBottom:"1rem"}}>
              <Row>
              <Col sm={1}> {obj.type==="GOLD" ? <text style={{color:"gold"}}><i class="fa-solid fa-circle" style={{fontSize:"10px"}}></i></text> : obj.type==="SILVER" ? <text style={{color:"silver"}}><i class="fa-solid fa-circle" style={{fontSize:"10px"}}></i></text> : <text style={{color:"#cd7f32"}}><i class="fa-solid fa-circle" style={{fontSize:"10px"}}></i></text>}</Col>
              <Col><text>{obj.name}</text>
              </Col>
              
              </Row>
             
              </Card>
            ))}
          </Row>
        ))
      }
    </div>
  )
}

export default BadgeList