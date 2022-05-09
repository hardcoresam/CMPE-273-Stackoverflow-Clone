import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import './styles.css'
import parse from 'html-react-parser'
const BookmarkList = (props) => {
    const navigate = useNavigate();
    const openQuestion = () => {
        navigate(`/questions/${1}`);
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
                                <Col sm={2}><text>{i.Post.score} votes</text></Col>
                                {i.Post.accepted_answer_id && <Col><Button style={{ backgroundColor: "hsl(140deg 40% 47%)", color: "white", marginTop: "-10px", border:"0" }}><i style={{ color: "white" }} class="fa-solid fa-check"></i> {i.Post.answers_count} Answers</Button></Col>}
                            </Row>
                            <Row className='textLimit3' style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px" }}><text onClick={openQuestion}>{parse(i.Post.body)}</text></Row>
                            <Row>
                                <Col sm={6}>
                                    {
                                        <Row>
                                        <Col sm={6}> { i.Post.tags.map((obj) => (
                                            <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                            <text  style={{ fontSize: "13px", cursor:"pointer" }}>{obj}</text>
                                        </button>
                                                ))}</Col>
                                          
                                            
                                        </Row>

                                    }
                                </Col>
                                <Col sm={3}></Col>
                                <Col> {moment(i.created_on).format("MMM Do YY")}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default BookmarkList