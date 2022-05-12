import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Constants from '../util/Constants.json'
const AnswerList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]
    const { userid } = useParams();
    const navigate = useNavigate();
    const [state, setstate] = useState([]);

    const [totalAnswers,setTotalAnswers] = useState(0)
    const [totalPages,setTotalPages] = useState(0)
    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(5)

    useEffect(() => {
        async function getAnswers() {
            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
                withCredentials: true
            }).then((r) => {
                setTotalAnswers(r.data.answersCount)
                setTotalPages(r.data.answersCount/10)
                setstate(r.data.userAnswers)

                var list = []
                if((r.data.answersCount/10) < 10){
                    let end
                    if(r.data.answersCount % 10 == 0){
                       end = r.data.answersCount / 10 
                    }else{
                        end = r.data.answersCount /10 + 1;
                    }
                    setEndOffset(end)
                    for (var i = startOffset; i <= end; i++) {
                        list.push(i)
                    }
                }else{
                    setEndOffset(10)
                    for (var i = startOffset; i <= 10; i++) {
                        list.push(i)
                    }
                }
                setPageCount(list)
            })
        }
        getAnswers()
    }, [])



    const openQuestion = (id) => {
        navigate(`/questions/${id}`);
        // console.log(id)
    }

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=interesting`);
    }



    const nextPageSet = () => {
        var list = []
        if(endOffset + 10 <= totalPages){
            for (var i = startOffset+10; i <= endOffset+10; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset+10)
            setEndOffset(endOffset+10)
        }else if(endOffset+10 > totalPages && endOffset < totalPages){
            for (var i = startOffset+10; i <= totalPages; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset+10)
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

        const res = await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers?offset=${10 * (index - 1)}`)
        setstate(res.data.userAnswers);
    }

    return (
        <div>
            <Row>
                <h5>{totalAnswers} {props.text}</h5>
            </Row>
            {
                state.map((i) => (
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                                <Col sm={2}><text>{i.score} votes</text></Col>
                                {i.question.accepted_answer_id === i.id && <Col><Button style={{ backgroundColor: "hsl(140deg 40% 47%)", color: "white",cursor:"default", marginTop: "-10px", border: "0" , fontSize:"12px"}}><i style={{ color: "white" }} class="fa-solid fa-check"></i> Accepted</Button></Col>}
                            </Row>
                            <Row><text style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px", cursor:"pointer" }} onClick={() => openQuestion(i.question.id)}>{i.question.title}</text></Row>
                            <Row style={{marginLeft:"-22px"}}>
                                <Col sm={7}>
                                    {i.question.tags.map((obj) => (
                                        <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                            <text style={{ fontSize: "13px", cursor: "pointer" }}>{obj}</text>
                                        </button>
                                    ))}
                                </Col>

                                <Col sm={1}></Col>
                                <Col style={{fontSize:"14px", color:"hsl(210deg 8% 45%)"}}>answered {moment(i.created_date).format("MMM Do")} at {moment(i.created_date).format("ha")}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }
            <Pagination style={{ marginLeft: "24rem" }}>
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

export default AnswerList