import React, { useEffect } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
const TagOverview = () => {
    const { tagname } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const show_user_posts = searchParams.get('show_user_posts')
    const filterBy = searchParams.get('filterBy')
    var description = "swdasd"
    useEffect(()=>{
        async function getQuestionforTags(){
        const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/?show_user_posts=${show_user_posts}&filterBy=${filterBy}`,{withCredentials:true}) 
        console.log(res)   
    }
    getQuestionforTags();
    },[])

    const openQuestion = () => {

    }
    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={7}>
                    <Row style={{ marginBottom: "3rem" }}><h1>Search Results</h1></Row>
                    <Row><Col sm={3}><text>Results tagged with </text></Col><Col sm={2} style={{ marginLeft: "-17px" }}><h5>{tagname}</h5></Col></Row>
                    <Row><text>{description}</text></Row>
                    <hr style={{ marginTop: "1rem" }}></hr>
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                                <Col sm={2}><text>31 votes</text></Col>
                            </Row>
                            <Row><text onClick={openQuestion}>Creating a function in R with variable number of arguments,</text></Row>
                            <Row>
                                <Col sm={6}><text>tag1 tag2</text></Col>
                                <Col sm={1}></Col>
                                <Col>answered Feb 8, 2018 at 21:02 by { }</Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>


        </div>
    )
}

export default TagOverview