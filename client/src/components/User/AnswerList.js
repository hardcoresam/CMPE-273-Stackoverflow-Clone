import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
const AnswerList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]
    const navigate = useNavigate();
    const openQuestion = (id) =>{
        navigate(`/questions/${id}`);
        // console.log(id)
    }

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=${false}`);
      }
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
                            <Col sm={2}><text>{i.score} votes</text></Col>
                            {i.question.accepted_answer_id && <Col><Button style={{backgroundColor:"green", color:"white",marginTop:"-10px"}}>✔{props.text}</Button></Col>}
                            </Row>
                            <Row><text style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px" }} onClick={()=>openQuestion(i.question.id)}>{i.question.title}</text></Row>
                            <Row>
                            <Col sm={6}>
                            {
                                <Row>
                                 <Col sm={6}>{ i.question.tags.map((obj) => (
                                    <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                    <text  style={{ fontSize: "13px", cursor:"pointer" }}>{obj}</text>
                                </button>
                            ))}</Col>
                                    
                            
                                </Row>
                            }
                            </Col>
                            <Col sm={1}></Col>
                            <Col>answered {moment(i.created_date).fromNow()}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default AnswerList