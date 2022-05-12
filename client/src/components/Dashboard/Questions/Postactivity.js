import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Constants from '../../util/Constants.json'
import { useParams } from 'react-router'
import { useLocation } from 'react-router'
import moment from 'moment'
import { useNavigate } from 'react-router'
const Postactivity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        async function getActivity() {
            const res = await axios.get(`${Constants.uri}/api/post/activities/${params.qid}`, { withCredentials: true });
            setActivity(res.data);
            // console.log(res)
        }
        getActivity();
    },[location])

    const openuserProfile = (i) => {
        navigate(`/User/${i}`)
      }
    return (
        <div>
        <Row style={{marginBottom:"1rem"}}>
        <Col sm={2}></Col>
        <Col><h2>Timeline for post - {params.qid}</h2></Col>
        </Row>
        <Row><Col sm={2}></Col>
        <Col style={{fontWeight:"bolder", marginBottom:"1rem"}}>{activity.length} events</Col></Row>
            <Row>
                <Col sm={2}></Col>
                <Col style={{ marginRight: "3rem" }}>
                    <Row>
                        <Card style={{ backgroundColor: "hsl(210deg 8% 85%)", fontWeight: "bold" }}>
                            <Row>
                                <Col sm={2}>when</Col>
                                <Col sm={2}>what</Col>
                                <Col sm={2}>by</Col>
                                <Col>comment</Col>
                            </Row>
                        </Card>

                        {
                            activity.map((i) => (
                                <Card>
                                    <Row>
                                    <Col sm={2}>{moment(i.created_on).format("MMM Do")} at {moment(i.created_on).format("ha")}</Col>
                                    <Col sm={2}>{i.type === "QUESTION_ASKED" && "Question Asked"}
                                    {i.type === "QUESTION_EDITED" && "Question Edited"}
                                    {i.type === "ANSWER_POSTED" && "Answer Posted"}
                                    {i.type === "COMMENT_ADDED" && "Comment Added"}
                                    </Col>
                                    <Col onClick={() =>openuserProfile(i.user_id)}  sm={2}><text style={{color:"blue", cursor:"pointer"}}>{i.user_display_name}</text></Col>
                                    <Col>{i.comment}</Col>
                                    </Row>
                                </Card>
                            ))
                        }
                    </Row>



                </Col>
            </Row>
        </div>
    )
}

export default Postactivity