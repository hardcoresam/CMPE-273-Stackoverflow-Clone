import React from 'react'
import { Button, Card, Col,Row } from 'react-bootstrap'
import './Styles.css'
import { useNavigate } from 'react-router'
const TagCard = () => {
  const navigate = useNavigate();
  const openTag = ()=>{
    
    navigate(`/tags/javascript/?show_user_posts=${false}&filterBy=${false}`);
  }
  return (
    <div>
    <Card style={{width:"16rem"}}>
    <Card.Body>
    <Row><Button className='tagButton' style={{width:"auto", borderRadius:"5px"}} onClick={openTag}>Javacript</Button></Row>
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