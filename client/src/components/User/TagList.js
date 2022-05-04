import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
const TagList = (props) => {
    const arr =[1]
    const navigate = useNavigate();
    const openTag = ()=>{
        navigate(`/tags/${"javascript"}/?show_user_posts=${true}&filterBy=${true}`);
    }
    return (
        <div>
            <Row>
                <h5>{props.state.length} {props.text}</h5>
            </Row>
            {
                props.state.map((i)=>(
                    <Card>
                <div style={{ margin: "1rem" }}>
                    <Row>
                        <Col sm={2}><text style={{cursor:"pointer"}} onClick={openTag}>{i.name}</text></Col>
                        <Col></Col>
                        <Col sm={2}>{i.score} Score</Col>
                        <Col sm={2}>{i.totalPosts} Posts</Col>
                    </Row>
                </div>
            </Card>
                ))
            }
            
        </div>
    )
}

export default TagList