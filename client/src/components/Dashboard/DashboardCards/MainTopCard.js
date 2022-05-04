import React, { useState } from 'react'
import { Button, Row, Col, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const MainTopCard = () => {
  const obj = useSelector(state => state.DashboardTopSlice)
  const { Title, questionCount } = obj.value
  const [title, settitle] = useState("")
  var navigate = useNavigate();
  const askquestion = () => {
    navigate('/askQuestion')
  }
  const openInteresting = ()=>{
     settitle("Interesting")
  }
  const openHot = ()=>{
    settitle("Hot")    
  }
  const openScore = ()=>{
    settitle("Score")
   
  }
  const openUnanswered = ()=>{
    settitle("Unanswered")
 
  }
  return (
    <div>
      <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
        <Row>
          <Col sm={9}>
            <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>{Title}</text>
          </Col>
          <Col>
            <Button onClick={askquestion}>Ask Question</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={3}>
            <text>{questionCount} Questions</text>
          </Col>
          <Col style={{marginRight:"48px"}} sm={3}></Col>
          <Col sm={6} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
            <button style={title == "Interesting" ? { backgroundColor: "#D0D0D0" } : { backgroundColor:"white" }} onClick={openInteresting}>Interesting</button>
            <button style={title == "Hot" ? { backgroundColor: "#D0D0D0" } : { backgroundColor:"white" }} onClick={openHot}>Hot</button>
            <button style={title == "Score" ? { backgroundColor: "#D0D0D0" } : { backgroundColor:"white" }} onClick={openScore}>Score</button>
            <button style={title == "Unanswered" ? { marginRight: "1rem", backgroundColor: "#D0D0D0" } : { backgroundColor:"white"}} onClick={openUnanswered}>Unanswered</button>
          </Col>

          <Col>
          </Col>
        </Row>
      </div>

      <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
    </div>
  )
}

export default MainTopCard