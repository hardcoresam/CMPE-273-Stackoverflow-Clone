import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
const BookmarkList = (props) => {
    const navigate = useNavigate();
    const openQuestion = () => {
        navigate(`/questions/${1}`);
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
                                {i.Post.accepted_answer_id && <Col><Button style={{ backgroundColor: "green", color: "white", marginTop: "-10px" }}>✔{props.text}</Button></Col>}
                            </Row>
                            <Row><text onClick={openQuestion}>{i.Post.body}</text></Row>
                            <Row>
                                <Col sm={6}>
                                    {
                                        <Row>
                                            {//i.Post.tags.map((obj) => (
                                                //     <Card style={{ width: "auto" }}>
                                                //     <text style={{fontSize:"13px"}}>{obj}</text>
                                                //     </Card>
                                                // ))
                                            }
                                        </Row>

                                    }
                                </Col>
                                <Col sm={2}></Col>
                                <Col>{i.created_on}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default BookmarkList