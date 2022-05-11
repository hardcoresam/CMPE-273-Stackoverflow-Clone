import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Constants from '../util/Constants.json'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
const TagList = (props) => {
    const { userid } = useParams();
    const [state, setstate] = useState([]);
    useEffect(()=>{
        async function getTags(){
            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/tags`, {
                withCredentials: true
            }).then((r) => {
                setstate(r.data)
            })
        }
        getTags();

    },[])
    const arr =[1]
    const navigate = useNavigate();
    const openTag = (tag)=>{
        navigate(`/tags/${tag}/?show_user_posts=${true}&filterBy=${true}`);
    }

    return (
        <div>
            <Row>
                <h5>{state.length} {props.text}</h5>
            </Row>
            {
                state.map((i)=>(
                    <Card>
                <div style={{ margin: "1rem" }}>
                    <Row>
                        <Col sm={2}><text style={{cursor:"pointer"}} onClick={() => openTag(i.name)}>{i.name}</text></Col>
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