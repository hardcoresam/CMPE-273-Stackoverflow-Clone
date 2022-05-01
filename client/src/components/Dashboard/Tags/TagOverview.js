import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'

const TagOverview = () => {
    const { tagname } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const show_user_posts = searchParams.get('show_user_posts')
    const filterBy = searchParams.get('filterBy')
    var description = "swdasd"

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getQuestionforTags() {
            const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/?show_user_posts=${show_user_posts}&filterBy=${filterBy}`, { withCredentials: true })
            const res1 = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?filterBy=interesting`)
            console.log(res1)
            setQuestions(res1.data.Posts)
        }
        getQuestionforTags();
    }, [])


    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={7}>
                    <Row style={{ marginBottom: "3rem" }}><h3>All Questions</h3></Row>
                    <Row style={{ marginBottom: "3rem" }}><h5>{questions.length} questions</h5></Row>
                    <Row><Col sm={3}><text>Questions tagged with </text></Col><Col sm={2} style={{ marginLeft: "-17px" }}><h5>{tagname}</h5></Col></Row>
                    <Row><text>{description}</text></Row>
                    <hr style={{ marginTop: "1rem" }}></hr>

                    {questions && questions.map(question => (
                        <Card>
                            <div style={{ margin: "1rem" }}>


                                <Row>
                                    <Col sm={2}>
                                        <Row><text>{question.score} votes</text></Row>
                                        <Row><span>{question.answers_count} answers</span></Row>
                                        <Row><span>{question.views_count} views</span></Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Link to="" style={{ textDecoration: "none" }}>{question.title}</Link>
                                        </Row>
                                        <Row>
                                            <text>{question.body}</text>
                                        </Row>
                                        <Row>
                                            {question.tags && question.tags.map(tag => (
                                                <span className='text-muted' style={{ fontSize: 13 }}>{tag}&nbsp;</span>
                                            ))}
                                        </Row>
                                    </Col>

                                </Row>


                                <Row>
                                    <Col sm={2}></Col>
                                    <Col>
                                        <span style={{float:'right'}}>asked on {moment(question.modified_date.split(',')[0]+question.modified_date.split(',')[1]).fromNow()}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    ))}

                </Col>
            </Row>


        </div>
    )
}

export default TagOverview