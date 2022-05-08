import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import parse from 'html-react-parser'
import './styles.css'
const ItemList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]
    const navigate = useNavigate();
    const openQuestion = (id) => {
        // console.log(id)
        navigate(`/questions/${id}`);
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
                                {i.accepted_answer_id && <Col><Button style={{ backgroundColor: "green", color: "white", marginTop: "-10px" }}>✔{props.text}</Button></Col>}
                            </Row>
                            <Row className='textLimit3'><text style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px" }} onClick={() => openQuestion(i.question.id)}>{parse(i.body)}</text></Row>
                            <Row>

                                {
                                    <Row>
                                        <Col sm={6}>{i.tags.map((obj) => (
                                            <Button style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                                <text style={{ fontSize: "13px" }}>{obj}</text>
                                            </Button>
                                        ))
                                        }</Col>
                                        <Col sm={1}></Col>
                                        <Col>asked {moment(i.created_date).fromNow()}</Col>
                                    </Row>

                                }

                                
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default ItemList