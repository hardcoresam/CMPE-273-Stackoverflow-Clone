import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button, Pagination } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import parse from 'html-react-parser'
import emptyimage from '../../images/emptyimage.png'

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate()
    var description = "swdasd"
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get("searchString");
    const orderBy = searchParams.get("orderBy");
    const [data, setData] = useState({})
    const [questions, setQuestions] = useState([])
    const [searchOptionsString,setSearchOptionsString] = useState("")

    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(15)
    const [totalPages, setTotalPages] = useState(0)
    const [tagDescription,setTagDescription] = useState("")

    useEffect(() => {
        async function getSearchresult() {
            const res1 = await axios.post(`${Constants.uri}/api/post/search?orderBy=${orderBy}`, {
                searchString: searchString
            }, { withCredentials: true });
            console.log(res1)
            setData(res1.data)
            setQuestions(res1.data.posts)
            setTotalPages(res1.data.postsCount / 10)
            setSearchOptionsString(res1.data.searchOptionsString)
            if(res1.data.tagDescription){
                setTagDescription(res1.data.tagDescription)
            }

            var list = []
            if((res1.data.postsCount/10) < 15){
                setEndOffset(res1.data.postsCount/10)
                for (var i = startOffset; i <= res1.data.postsCount/10; i++) {
                    list.push(i)
                }
            }else{
                setEndOffset(15)
                for (var i = startOffset; i <= 15; i++) {
                    list.push(i)
                }
            }
            setPageCount(list)
        }
        getSearchresult();
    }, [location])

    const askquestion = () => {
        navigate('/askQuestion')
    }

        const previousPageSet = () => {
            console.log(startOffset,endOffset)
            if (startOffset >= 15) {
                var list = []
                if(endOffset==totalPages){
                    setEndOffset(startOffset)
                    for (var i = startOffset - 15; i <= startOffset; i++) {
                        list.push(i)
                    }
                }else{
                    for (var i = startOffset - 15; i <= endOffset - 15; i++) {
                        list.push(i)
                    }
                }

                setPageCount(list)
                setStartOffset(startOffset - 15)
                setEndOffset(endOffset - 15)
            }
        }

        const nextPageSet = () => {
            var list = []
            console.log(startOffset, endOffset, totalPages)
            if (endOffset + 15 <= totalPages) {
                for (var i = startOffset + 15; i <= endOffset + 15; i++) {
                    list.push(i)
                }
                setPageCount(list)
                setStartOffset(startOffset + 15)
                setEndOffset(endOffset + 15)
            }else if(endOffset + 15 > totalPages && endOffset < totalPages){
                for (var i = startOffset+15; i <= totalPages; i++) {
                    list.push(i)
                }
                setPageCount(list)
                setStartOffset(startOffset+15)
                setEndOffset(totalPages)
            }

        }

        const handlePage = async (index) => {
            console.log(index)
            const res = await axios.post(`${Constants.uri}/api/post/search?orderBy=${orderBy}&offset=${10*(index-1)}`, {
                searchString: searchString
            }, { withCredentials: true });
            setData(res.data)
            setQuestions(res.data.posts)
        }

        const openTag =(tag)=>{
            navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=interesting`);
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
                            <br/>
                            <Row> <span  style={{fontSize:12}}>{data.resultString}</span></Row>
                            <Row> <span style={{fontSize:12}} className='text-muted'>{data.searchOptionsString}</span></Row>
                            <br/>
                            {tagDescription && (<Row>
                                <span className='text-muted'>{tagDescription}</span>
                            </Row>)}
                            <Row style={{ marginTop: "2rem" }}>
                                <Col sm={3}>
                                    <span><span style={{ fontWeight: 'bold' }}>{data.postsCount}</span> Results</span>
                                </Col>
                            <Col style={{ marginRight: "48px" }} sm={5}></Col>
                            <Col sm={4} style={{ marginLeft: "-3rem", marginTop: "7px", fontSize:12, textAlign: 'right' }}>
                               
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
                                        {
                                            question.type==="QUESTION" && (question.accepted_answer_id ? <Row><Button style={{ marginLeft:"12px",cursor:"default", backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} ><i style={{ color: "white" }} class="fa-solid fa-check"></i> {question.answers_count} answers</Button></Row>
                                            : <Row><Button style={{backgroundColor: "white",cursor:"default",marginLeft:"12px", color: "hsl(140deg 40% 47%)", borderColor:"hsl(140deg 40% 47%)", width: "7rem", borderRadius: "3px"}}> {question.answers_count} answers</Button></Row>)
                                        }
                                    </Col>
                                    <Col sm={1}></Col>
                                    <Col sm={9}>
                                        <Row>
                                            <Col>
                                            {
                                                question.type==="QUESTION" ? <Link to={`/questions/${question.id}`} style={{ textDecoration: "none", fontSize: 20, color: "hsl(206deg 100% 40%)", fontSize: "17px" }}>Q: {question.title}</Link>
                                                : <Link to={`/questions/${question.question.id}`} style={{ textDecoration: "none", fontSize: 20, color: "hsl(206deg 100% 40%)", fontSize: "17px" }}>A: {question.question.title}</Link>
                                            }
                                                
                                            </Col>
                                        </Row>
                                        <Row className='textLimit'>
                                            <text style={{ color: "hsl(210deg 8% 25%)", fontSize: "13px" }}>{parse(question.body)}</text>
                                        </Row>
                                        <Row>
                                           {question.type==="QUESTION" &&  <Col sm={6}>{question.tags.map(tag => (<button onClick={()=>openTag(tag)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</button>))}&nbsp;&nbsp;&nbsp;</Col>}

                                        </Row>
                                        <Row>
                                            <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo ?question.User.photo : emptyimage}></img>{question.User.username}</Link> {question.type==="QUESTION" ? <text>asked</text> : <text>answered</text>} {moment(question.created_date).fromNow()}</span>
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

export default Search