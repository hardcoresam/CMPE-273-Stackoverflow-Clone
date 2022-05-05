import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
const ItemList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]
    const navigate = useNavigate();
    const openQuestion = (id) =>{
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
                            {i.accepted_answer_id && <Col><Button style={{backgroundColor:"green", color:"white",marginTop:"-10px"}}>✔{props.text}</Button></Col>}
                            </Row>
                            <Row><text onClick={()=>openQuestion(i.question.id)}>{i.body}</text></Row>
                            <Row>
                            <Col sm={6}>
                            {
                                <Row>
                                {i.tags.map((obj) => (
                                    <Card style={{ width: "auto" }}>
                                    <text style={{fontSize:"13px"}}>{obj}</text>
                                    </Card>
                                ))
                            }
                                </Row>
                                
                            }
                            </Col>
                            <Col sm={1}></Col>
                            <Col>asked {moment(i.created_date).fromNow()}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default ItemList