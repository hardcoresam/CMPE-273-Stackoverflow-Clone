import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import parse from 'html-react-parser'
const Search = () => {
    const location = useLocation();
    const navigate = useNavigate()
    var description = "swdasd"
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get("searchString");
    const orderBy = searchParams.get("orderBy");
    const [data, setData] = useState({})
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function getSearchresult() {
            const res1 = await axios.post(`${Constants.uri}/api/post/search?orderBy=${orderBy}`, {
                searchString: searchString
            }, { withCredentials: true });
            setData(res1.data)
            setQuestions(res1.data.posts)

        }
        getSearchresult();
    },[location])

    const askquestion = () => {
        navigate('/askQuestion')
      }
    return (
        <div>
            <Row>
                <Col sm={2}>

                </Col>
                <Col sm={7}>
                    <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
                        <Row>
                            <Col sm={9}>
                                <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>Search Results</text>
                            </Col>
                            <Col>
                                <Button style={{ backgroundColor: "hsl(206deg 100% 52%)" }} onClick={askquestion}>Ask Question</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "2rem" }}>
                            <Col sm={3}>
                            <text>{data.resultString}</text>

                            </Col>
                            <Col style={{ marginRight: "48px" }} sm={2}></Col>
                            <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
                            </Col>

                            <Col>
                            </Col>
                        </Row>
                    </div>

                    <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>

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
                                    <Col sm={6}>{question.tags.map(tag => (<Button style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</Button>))}&nbsp;&nbsp;&nbsp;</Col>

                                </Row>
                                <Row>
                                    <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo}></img>{question.User.username}</Link> asked,  {moment(question.created_date).fromNow()}</span>
                                </Row>
                                <Row>
                                    <Col><hr style={{ marginTop: "1rem", marginLeft: "-218px" }}></hr></Col>

                                </Row>
                            </Col>

                        </Row>
                        
                        <br />
                    </>
                ))}

            </div>
                </Col>

            </Row>
        </div>
    )
}

export default Search