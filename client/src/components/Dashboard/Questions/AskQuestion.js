import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import questionlogo from '../../images/questionlogo1.PNG'
import Constants from './../../util/Constants.json'
import RichTextEditor,{ stateToHTML } from 'react-rte'
import AskQ from './AskQ.js'
import { useSelector } from 'react-redux'
import Questionbody from './Questionbody'
// import { updatingbody } from '../../../features/QuestionBodySlice'
const AskQuestion = () => {
    const obj = useSelector(state => state.QuestionBodySlice);
    const [questionForm,setQuestionFormData] = useState({
        title:"",
        body:"",
        tags:"",
        type:"QUESTION",
        isImage:false
    })

    const {title,body,tags} = questionForm

    const onChangeData = async (e) => {
        e.preventDefault()
        setQuestionFormData({...questionForm,[e.target.name]:e.target.value})
        console.log(e)
    }

    const askQuestion = async (e) => {
        e.preventDefault()
        // console.log(questionForm)
        console.log("posting quesrion")
        const res = await axios.post(`${Constants.uri}/api/post/question`,questionForm,{withCredentials:true})
        console.log(res)
    }

    const onChange = (value)=>{
        setQuestionFormData({
            ...questionForm,
            body : value
        })
       console.log(value)
       console.log(questionForm)
    }

    return (
        <div style={{ backgroundColor: "#f2f2f2", width: "auto", height: "60rem" }}>
            <Row>
            <Col sm={2}></Col>
                <Col style={{marginTop: "30px" }}>
                    <text style={{ fontSize: "30px" }}>Ask a public question</text>
                </Col>
                <Col>
                    <img style={{ width: "33rem" }} src={questionlogo}></img>
                </Col>
            </Row>
            <Row>
            <Col sm={2}></Col>
                <Col>
                    <Card style={{width:"53rem"}}>
                        <div style={{ margin: "1rem" , display:"flex", flexDirection:"column"}}>
                            <Card.Title>
                                Title
                            </Card.Title>
                            <text>Be specific and imagine you’re asking a question to another person</text>
                            <input style={{marginBottom :"20px"}} name="title" value={title} onChange={(e)=>onChangeData(e)}></input>
                            <Card.Title>Body</Card.Title>
                            <text>Include all the information someone would need to answer your question</text>
                            {//<RichTextEditor value={state} onChange={onChange} />
                            }
                            <AskQ onChangeData={onChangeData} onChange={onChange}/>
                            <Card.Title>
                                Tags
                            </Card.Title>
                            <text>Add up to 5 tags to describe what your question is about</text>
                            <input name="tags" value={tags} onChange={(e)=>onChangeData(e)}></input>
                        </div>
                    </Card>
                    <Button style={{marginTop :"20px"}} onClick={(e)=>askQuestion(e)}>Post your question</Button>
                </Col>
            </Row>
        </div>
    )
}

export default AskQuestion