import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const MainTopCard = () => {
  const obj = useSelector(state => state.DashboardTopSlice)
  const {Title,questionCount} = obj.value

  var navigate = useNavigate();
  const askquestion =()=>{
    navigate('/askQuestion')
  }
  return (
    <div>
    <div style={{marginTop : "1rem", marginLeft:"-15px"}}>
    <Row>
        <Col sm={9}>
          <text style={{fontSize : "1.9rem", PaddingBottom:"1rem"}}>{Title}</text>
        </Col>
        <Col>
          <Button onClick={askquestion}>Ask Question</Button>
        </Col>
      </Row>
      <Row style={{marginTop:"2rem"}}>
        <Col sm={9}>
          <text>{questionCount}</text>
        </Col>
        <Col>
        </Col>
      </Row>
    </div>
      
      <hr style={{marginTop : "1rem", marginLeft:"-45px"}}></hr>
    </div>
  )
}

export default MainTopCard