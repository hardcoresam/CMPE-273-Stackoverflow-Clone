import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Pagination } from 'react-bootstrap'
import axios from 'axios'
import Constants from './../../util/Constants.json'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import moment from 'moment'
import { useNavigate } from 'react-router'
import './styles.css'
import parse from 'html-react-parser'
import { clickReducer } from '../../../features/DashboardTopSlice';
import { postReducer,countReducer } from '../../../features/PostSlice'
import { useSelector } from 'react-redux'
import emptyimage from '../../images/emptyimage.png'
const MainCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [questions, setQuestions] = useState([])
    const obj = useSelector(state => state.PostSlice)

    const { questions, Title } = obj.value;

    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(15)

    const [totalPages,setTotalPages] = useState(0)


    useEffect(() => {
        async function getQuests() {
            const res = await axios.get(`${Constants.uri}/api/post/dashboard`)
            dispatch(postReducer(res.data.questionsForDashboard))
            dispatch(countReducer(res.data.questionsCount))
            setTotalPages(res.data.questionsCount/10)
        }
        getQuests()

        var list = []
        for (var i = startOffset; i <= endOffset; i++) {
            list.push(i)
        }
        setPageCount(list)
    }, [])

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=${false}`);
    }
    const nextPageSet = () => {
        var list = []
        if(endOffset + 15 <= totalPages){
            for (var i = startOffset+15; i <= endOffset+15; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset+15)
            setEndOffset(endOffset+15)
        }else if(endOffset+15 > totalPages && endOffset < totalPages){
            for (var i = startOffset+15; i <= totalPages; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset+15)
            setEndOffset(totalPages)
        }

    }

    const previousPageSet = () => {
        if (startOffset >= 15) {
            var list = []
            for (var i = startOffset - 15; i <= endOffset - 15; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset - 15)
            setEndOffset(endOffset - 15)
        }
    }

    const handlePage = async (index) => {
        const res = await axios.get(`${Constants.uri}/api/post/dashboard?filterBy=${Title.toLowerCase()}&offset=${10*(index-1)}`)
        dispatch(postReducer(res.data.questionsForDashboard))
    }

    return (
        <div>

            <div style={{ marginTop: "39px" }}>
                {questions && questions.map(question => (
                    <>
                        <Row style={{marginTop:"-30px"}}>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                <Row style={{ marginLeft: "50px" }}>{question.score} votes</Row>
                                { question.answers_count > 0 ?
                                    question.accepted_answer_id ? 
                                        (<Row><button style={{ backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} ><i style={{ color: "white" }} class="fa-solid fa-check"></i> {question.answers_count} answers</button></Row>) 
                                        : 
                                        (<Row><button style={{ backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} > {question.answers_count} answers</button></Row>)
                                    :
                                    (<Row><button style={{ backgroundColor: "#898989", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} > 0 answers</button></Row>)
                                }
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
                                    <text style={{ color: "hsl(210deg 8% 25%)", fontSize: "13px" }}>{parse(question.body)}</text>
                                </Row>
                                <Row>
                                    <Col sm={6}>{question.tags.map(tag => (<button onClick={() => openTag(tag)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</button>))}&nbsp;&nbsp;&nbsp;</Col>

                                </Row>
                                <Row>
                                    <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo ?question.User.photo :emptyimage}></img>{question.User.username}</Link> asked,  {moment(question.created_date).format("MMM Do")} at {moment(question.created_date).format("ha")} </span>
                                </Row>
                                <Row>
                                    <Col><hr style={{ marginTop: "1rem", marginLeft: "-182px", marginRight:"-50px" }}></hr></Col>

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

                <Pagination>
                    <Pagination.First onClick={() => previousPageSet()} />

                    {pageCount.map(item => (
                        <Pagination.Item onClick={() => handlePage(item)}>{item}</Pagination.Item>
                    ))}
                    <Pagination.Last onClick={() => nextPageSet()} />
                </Pagination>
            </div>
        </div >
    )
}

export default MainCard