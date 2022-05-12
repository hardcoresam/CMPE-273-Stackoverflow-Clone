import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Constants from '../util/Constants.json'
import './styles.css'
const ItemList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]

    const { userid } = useParams();
    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(5)
    const [state, setstate] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        async function getBookmarks() {
            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/questions`, {
                withCredentials: true
            }).then((r) => {
                setTotalQuestions(r.data.questionsCount)

                setTotalPages(r.data.questionsCount / 10)


                setstate(r.data.userQuestions)
                var list = []
                if ((r.data.questionsCount / 10) < 10) {
                    let end
                    if(r.data.questionsCount % 10 == 0){
                       end = r.data.questionsCount / 10 
                    }else{
                        end = r.data.questionsCount /10 + 1;
                    }
                    setEndOffset(end)
                    for (var i = startOffset; i <= end; i++) {
                        list.push(i)
                    }
                } else {
                    setEndOffset(10)
                    for (var i = startOffset; i <= 10; i++) {
                        list.push(i)
                    }
                }
                setPageCount(list)
            })
        }
        getBookmarks()
    }, [])
    const navigate = useNavigate();
    const openQuestion = (id) => {
        // console.log(id)
        navigate(`/questions/${id}`);
    }
    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=interesting`);
    }

    const nextPageSet = () => {
        var list = []
        if (endOffset + 10 <= totalPages) {
            for (var i = startOffset + 10; i <= endOffset + 10; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset + 10)
            setEndOffset(endOffset + 10)
        } else if (endOffset + 10 > totalPages && endOffset < totalPages) {
            for (var i = startOffset + 10; i <= totalPages; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset + 10)
            setEndOffset(totalPages)
        }
    }

    const previousPageSet = () => {
        if (startOffset >= 10) {
            var list = []
            for (var i = startOffset - 10; i <= endOffset - 10; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset - 10)
            setEndOffset(endOffset - 10)
        }
    }
    const handlePage = async (index) => {

        const res = await Axios.get(`${Constants.uri}/api/users/${userid}/activity/questions?offset=${10 * (index - 1)}`)
        // dispatch(postReducer(res.data.questionsForDashboard))
        setstate(res.data.userQuestions);
    }

    return (
        <div>
            <Row>
                <h5>{totalQuestions} {props.text}</h5>
            </Row>
            {
                state.map((i) => (
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                                {i.accepted_answer_id ? <Col sm={3}><Button style={{ backgroundColor: "hsl(140deg 40% 47%)", cursor: "default", color: "white", marginTop: "-10px", border: "0", fontSize: "12px" }}><i style={{ color: "white" }} class="fa-solid fa-check"></i> {i.answers_count} Answers</Button></Col> : <Col sm={3}><Button style={{ backgroundColor: "white", cursor: "default", color: "hsl(140deg 40% 47%)", borderColor: "hsl(140deg 40% 47%)", marginTop: "-10px", fontSize: "12px" }}> {i.answers_count} Answers</Button></Col>}
                                <Col sm={3} style={{ marginLeft: "-50px" }}><text style={{ fontSize: "15px" }}>{i.score} votes</text></Col>
                                <Col sm={2}><text style={{ fontSize: 13, color: "hsl(27deg 90% 55%)", marginLeft: "-90px" }}>{i.views_count} views</text></Col>
                            </Row>
                            <Row className='textLimit3'><text style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px", cursor: "pointer" }} onClick={() => openQuestion(i.id)}>{parse(i.body)}</text></Row>

                            <Row style={{ marginLeft: "-18px" }}>
                                <Col sm={7}>
                                    {i.tags.map((obj) => (
                                        <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                            <text style={{ fontSize: "13px", cursor: "pointer" }}>{obj}</text>
                                        </button>
                                    ))}
                                </Col>

                                <Col sm={1}></Col>
                                <Col style={{ fontSize: "14px", color: "hsl(210deg 8% 45%)" }}>asked {moment(i.created_date).format("MMM Do")} at {moment(i.created_date).format("ha")}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }
            <Pagination>
                <Pagination.First onClick={() => previousPageSet()} />

                {pageCount.map(item => (
                    <Pagination.Item onClick={() => handlePage(item)}>{item}</Pagination.Item>
                ))
                }
                <Pagination.Last onClick={() => nextPageSet()} />
            </Pagination>
        </div>
    )
}

export default ItemList