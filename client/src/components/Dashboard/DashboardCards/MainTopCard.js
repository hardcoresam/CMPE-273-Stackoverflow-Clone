import React, { useState } from 'react'
import { Button, Row, Col, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postReducer } from '../../../features/PostSlice'
import Constants from  '../../util/Constants.json'
import axios from 'axios'
const MainTopCard = () => {
  const dispatch = useDispatch();
  const obj = useSelector(state => state.DashboardTopSlice)
  const { Title, questionCount } = obj.value
  const [title, settitle] = useState("")
  var navigate = useNavigate();
  const askquestion = () => {
    navigate('/askQuestion')
  }
  const openInteresting = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=interesting`);
    dispatch(postReducer(res.data.questionsForDashboard));
     settitle("Interesting")
  }
  const openHot = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=hot`);
    dispatch(postReducer(res.data.questionsForDashboard));
    settitle("Hot")    
  }
  const openScore = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=score`);
    dispatch(postReducer(res.data.questionsForDashboard));
    settitle("Score")
   
  }
  const openUnanswered = async()=>{
    const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=unanswered`);
    dispatch(postReducer(res.data.questionsForDashboard));
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
            <Button style={{backgroundColor:"hsl(206deg 100% 52%)"}} onClick={askquestion}>Ask Question</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={3}>
            <text>{questionCount} Questions</text>
          </Col>
          <Col style={{marginRight:"48px"}} sm={2}></Col>
          <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
            <button style={title == "Interesting" ? { backgroundColor: "#D0D0D0", marginRight:"1px", borderWidth:"1px" } : { backgroundColor:"white",marginRight:"1px", color:"hsl(210deg 8% 45%)", borderWidth:"1px"  }} onClick={openInteresting}>Interesting</button>
            <button style={title == "Hot" ? { backgroundColor: "#D0D0D0",marginRight:"1px" , borderWidth:"1px" } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px"  }} onClick={openHot}>Hot</button>
            <button style={title == "Score" ? { backgroundColor: "#D0D0D0",marginRight:"1px" , borderWidth:"1px" } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px"  }} onClick={openScore}>Score</button>
            <button style={title == "Unanswered" ? { marginRight: "1rem", backgroundColor: "#D0D0D0",marginRight:"1px", borderWidth:"1px"  } : { backgroundColor:"white",color:"hsl(210deg 8% 45%)",marginRight:"1px", borderWidth:"1px" }} onClick={openUnanswered}>Unanswered</button>
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