import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Constants from './../../util/Constants.json'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import moment from 'moment'
import { clickReducer } from '../../../features/DashboardTopSlice';
const MainCard = () => {
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getQuests() {
            const res = await axios.get(`${Constants.uri}/api/post/dashboard`)
            console.log(res)
            setQuestions(res.data)
            dispatch(clickReducer({
                Title:"All Questions",
                questionCount : res.data.length
            }))
        }
        getQuests()
    }, [])

    return (
        <div>

            <div style={{ marginTop: "1rem", marginLeft: "45px" }}>
                {questions && questions.map(question => (
                    <>
                        <Row>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                <Row>{question.score} votes</Row>
                                <Row><Button className='btn-success ' style={{ paddingLeft: "1px", paddingRight: "1px", paddingTop: 0, paddingBottom: 0 }} >{question.answers_count} answers</Button></Row>
                                <Row><span className="text-warning">{question.views_count} views</span></Row>
                            </Col>
                            <Col sm={1}></Col>
                            <Col>
                                <Row>
                                    <Link to={`/questions/${question.id}`} style={{textDecoration:"none",fontSize:20}}>{question.title}</Link>
                                </Row>
                                <Row>
                                    <text>{question.body}</text>
                                </Row>
                                <Row>
                                    <Col sm={6}>Tags: {question.tags.map(tag => (<Button className='btn-secondary' style={{padding:0,fontSize:12}}>{tag}</Button>))}&nbsp;&nbsp;&nbsp;</Col>
                                
                                </Row>
                                <Row>
                                <span className='text-muted' style={{fontSize:13,textAlign:'right'}}><Link to={`/User/${question.User.id}`}>{question.User.username}</Link> asked,  {moment(question.created_date).fromNow()}</span>
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