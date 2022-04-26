import React from 'react'
import { Button, Card, Col,Row } from 'react-bootstrap'
import './Styles.css'
const TagCard = () => {
  return (
    <div>
    <Card style={{width:"16rem"}}>
    <Card.Body>
    <Row><Button className='tagButton' style={{width:"auto", borderRadius:"5px"}}>Javacript</Button></Row>
    <Row style={{marginTop:"1rem"}}><text>A tag is a keyword or label that categorizes your question with other, similar questions.</text></Row>
    <Row style={{marginTop:"1rem"}}>
    <Col sm={5}>dwddsafasffwefefef</Col>
    <Col sm={2}></Col>
    <Col>vanaavdm</Col>
    </Row>
    </Card.Body>
    </Card>
    </div>
  )
}

export default TagCard