import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
const TagList = (props) => {
    const arr =[1]
    const navigate = useNavigate();
    const openTag = ()=>{
        navigate(`/tags/${1}`);
    }
    return (
        <div>
            <Row>
                <h5>{props.state.length} {props.text}</h5>
            </Row>
            {
                arr.map((i)=>(
                    <Card>
                <div style={{ margin: "1rem" }}>
                    <Row>
                        <Col sm={2}><text style={{cursor:"pointer"}} onClick={openTag}>{i.name}hkjh</text></Col>
                        <Col></Col>
                        <Col sm={1}>{i.score}</Col>
                        <Col sm={1}>{i.totalPosts}</Col>
                    </Row>
                </div>
            </Card>
                ))
            }
            
        </div>
    )
}

export default TagList