import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Constants from './../../util/Constants.json'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import moment from 'moment'
import { useNavigate } from 'react-router'
import './styles.css'
import parse from 'html-react-parser'
import { clickReducer } from '../../../features/DashboardTopSlice';
import { postReducer } from '../../../features/PostSlice'
import { useSelector } from 'react-redux'
const MainCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [questions, setQuestions] = useState([])
    const obj = useSelector(state => state.PostSlice)
    const {questions} = obj.value;
    useEffect(() => {
        async function getQuests() {
            const res = await axios.get(`${Constants.uri}/api/post/dashboard`)
            console.log(res)
            // setQuestions(res.data)
            dispatch(postReducer(res.data))
        }
        getQuests()
    }, [])

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=${false}`);
      }

    return (
        <div>

            <div style={{ marginTop: "1rem", marginLeft: "45px", overflow: "hidden" }}>
                {questions && questions.map(question => (
                    <>
                        <Row>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                <Row style={{ marginLeft: "50px" }}>{question.score} votes</Row>
                                <Row><button style={{ backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} ><i style={{ color: "white" }} class="fa-solid fa-check"></i> {question.answers_count} answers</button></Row>
                                <Row><span style={{ marginLeft: "50px", color: "hsl(27,90%,55%)" }}>{question.views_count} views</span></Row>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={9}>
                                <Row>
                                    <Col>
                                    <Link to={`/questions/${question.id}`} style={{ textDecoration: "none", fontSize: 20, color: "hsl(206deg 100% 40%)", fontSize: "17px" }}>{question.title}</Link>
                                    </Col>
                                </Row>
                                <Row className='textLimit'>
                                    <text  style={{ color: "hsl(210deg 8% 25%)", fontSize: "13px" }}>{parse(question.body)}</text>
                                </Row>
                                <Row>
                                    <Col sm={6}>{question.tags.map(tag => (<button onClick={()=>openTag(tag)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</button>))}&nbsp;&nbsp;&nbsp;</Col>

                                </Row>
                                <Row>
                                    <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo}></img>{question.User.username}</Link> asked,  {moment(question.created_date).fromNow()}</span>
                                </Row>
                                <Row>
                                    <Col><hr style={{ marginTop: "1rem", marginLeft: "-218px" }}></hr></Col>

                                </Row>
                            </Col>

                        </Row>
                        {/* <Row>
                            <Col sm={2} style={{ marginRight: "-2rem", marginLeft: "-1rem" }}>
                                <Button className='btn-success ' style={{paddingLeft:"2px",paddingRight:"2px",paddingTop:0,paddingBottom:0}} >{question.answers_count} answers</Button>
                            </Col>
                            <Col>
                                <text>{question.body}</text>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                {question.views_count} views
                            </Col>
                            <Col sm={6}>{question.tags.map(tag=>(<span>{tag}&nbsp;</span>))}</Col>
                            <Col><span className='text-muted' style={{fontSize:12}}>{question.User.username} asked,  {question.created_date}</span></Col>
                        </Row> */}
                        <br />
                    </>
                ))}

            </div>

            <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
        </div>
    )
}

export default MainCard