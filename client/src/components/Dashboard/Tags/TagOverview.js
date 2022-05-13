import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button, Pagination } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router'
import emptyimage from '../../images/emptyimage.png'
const TagOverview = () => {
    const { tagname } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const show_user_posts = searchParams.get('show_user_posts')
    const filterBy = searchParams.get('filterBy')
    const userid = searchParams.get('userid');
    // var description = "swdasd"
    const [description, setdescription] = useState("");
    const [questions, setQuestions] = useState([])
    const [title, settitle] = useState("Interesting")
    const navigate = useNavigate();

    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(15)

    const [totalPages, setTotalPages] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)

    useEffect(() => {
        async function getQuestionforTags() {
            const res1 = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=${filterBy}&userid=${userid}`, { withCredentials: true })
            // const res1 = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?filterBy=interesting`)
            setQuestions(res1.data.Posts)
            setdescription(res1.data.description);
            setTotalQuestions(res1.data.postsCount)

            if (res1.data.postsCount % 10 == 0) {
                setTotalPages(res1.data.postsCount / 10)
            } else {
                setTotalPages(res1.data.postsCount / 10 + 1)
            }

            var list = []
            if ((res1.data.postsCount / 10) < 15) {
                let end
                if (res1.data.postsCount % 10 == 0) {
                    end = res1.data.postsCount / 15
                } else {
                    end = res1.data.postsCount / 15 + 1;
                }
                setEndOffset(end)
                for (var i = startOffset; i <= end; i++) {
                    list.push(i)
                }
            } else {
                setEndOffset(15)
                for (var i = startOffset; i <= 15; i++) {
                    list.push(i)
                }
            }
            setPageCount(list)
        }
        getQuestionforTags();
    }, [tagname])


    const openInteresting = async () => {
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=interesting&userid=${userid}`);
        setQuestions(res.data.Posts)
        settitle("Interesting")
    }
    const openHot = async () => {
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=hot&userid=${userid}`);
        console.log(res)
        setQuestions(res.data.Posts)
        settitle("Hot")
    }
    const openScore = async () => {
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=score&userid=${userid}`);
        setQuestions(res.data.Posts)
        settitle("Score")

    }
    const openUnanswered = async () => {
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=unanswered&userid=${userid}`);
        setQuestions(res.data.Posts)
        settitle("Unanswered")

    }

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=interesting`);
    }

    const nextPageSet = () => {
        var list = []
        if (endOffset + 15 <= totalPages) {
            for (var i = startOffset + 15; i <= endOffset + 15; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset + 15)
            setEndOffset(endOffset + 15)
        } else if (endOffset + 15 > totalPages && endOffset < totalPages) {
            for (var i = startOffset + 15; i <= totalPages; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset + 15)
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
        console.log(filterBy)
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?show_user_posts=${show_user_posts}&filterBy=${title.toLowerCase()}&userid=${userid}&offset=${10 * (index - 1)}`, { withCredentials: true })
        setQuestions(res.data.Posts)
    }

    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={7}>

                    <Row style={{ marginBottom: "1rem", marginTop: "17px" }}><h3>Questions tagged [{tagname}]</h3></Row>
                    <Row style={{ marginBottom: "2rem" }}><text>{description}</text></Row>
                    <Row style={{ marginBottom: "1rem" }}>{questions && (<Col sm={5}><h5>{totalQuestions} Questions</h5></Col>)}
                        <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
                            <button style={title == "Interesting" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", marginRight: "1px", color: "hsl(210deg 8% 45%)", borderWidth: "1px" }} onClick={openInteresting}>Interesting</button>
                            <button style={title == "Hot" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openHot}>Hot</button>
                            <button style={title == "Score" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openScore}>Score</button>
                            <button style={title == "Unanswered" ? { marginRight: "1rem", backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openUnanswered}>Unanswered</button>
                        </Col></Row>

                    <hr style={{ marginTop: "1rem" }}></hr>

                    {questions && questions.map(question => (
                        <Row>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                <Row style={{ marginLeft: "50px" }}>{question.score} votes</Row>
                                <Row>
                                    {
                                        question.accepted_answer_id ?
                                            (<Button style={{ cursor: "default", marginLeft: "12px", backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} ><i style={{ color: "white" }} class="fa-solid fa-check"></i> {question.answers_count} answers</Button>)
                                            :
                                            (<Button style={{ backgroundColor: "white", cursor: "default", marginLeft: "12px", color: "hsl(140deg 40% 47%)", borderColor: "hsl(140deg 40% 47%)", width: "7rem", borderRadius: "3px" }}> {question.answers_count} answers</Button>)
                                    }

                                </Row>
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
                                    <Col style={{ marginLeft: "-9px" }} sm={6}>{question.tags.map(tag => (<Button onClick={() => openTag(tag)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</Button>))}&nbsp;&nbsp;&nbsp;</Col>
                                </Row>
                                <Row>
                                    <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo ? question.User.photo : emptyimage}></img>{question.User.username}</Link> asked  {moment(question.created_date).fromNow()}</span>
                                </Row>
                                <Row>
                                    <Col><hr style={{ marginTop: "1rem", marginLeft: "-143px" }}></hr></Col>

                                </Row>
                            </Col>

                        </Row>
                    ))}

                    <Pagination>
                        <Pagination.First onClick={() => previousPageSet()} />

                        {pageCount.map(item => (
                            <Pagination.Item onClick={() => handlePage(item)}>{item}</Pagination.Item>
                        ))}
                        <Pagination.Last onClick={() => nextPageSet()} />
                    </Pagination>

                </Col>


            </Row>



        </div>
    )
}

export default TagOverview