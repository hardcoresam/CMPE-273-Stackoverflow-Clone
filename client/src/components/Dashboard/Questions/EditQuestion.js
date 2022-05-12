import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Toast } from 'react-bootstrap'
import questionlogo from '../../images/questionlogo1.PNG'
import Constants from '../../util/Constants.json'
import RichTextEditor,{ stateToHTML } from 'react-rte'
import AskQ from './AskQ.js'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import EditQ from './EditQ'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

// import { updatingbody } from '../../../features/QuestionBodySlice'
const EditQuestion = () => {
    const navigate= useNavigate();
    const obj = useSelector(state => state.QuestionBodySlice);

    const [questionForm,setQuestionFormData] = useState({
        title:"",
        body:"",
        tags:"",
        type:"QUESTION",
        isImage:false
    })

    const {title,body,tags} = questionForm

    const params = useParams()

    useEffect(()=>{
        async function getQuestion(){
            const res = await axios.get(`${Constants.uri}/api/post/${params.questionId}`,{withCredentials:true})
            console.log(res)
            setQuestionFormData({...setQuestionFormData,title:res.data.title,body:res.data.body,tags:res.data.tags})
        }
        getQuestion()
    },[])

    const onChangeData = async (e) => {
        e.preventDefault()
        setQuestionFormData({...questionForm,[e.target.name]:e.target.value})
        console.log(e)
    }

    const updateQuestion = async (e) => {
        e.preventDefault()
        console.log(questionForm)
        const res = await axios.put(`${Constants.uri}/api/post/question/${params.questionId}`,
        questionForm
        ,{withCredentials:true})
        if(res){
            toast.success("Updated Question")
            navigate(`/questions/${params.questionId}`)
        }
    }

    const onChange = (value)=>{
        setQuestionFormData({
            ...questionForm,
            body : value
        })
    }

    return (
        <div style={{ backgroundColor: "#f2f2f2", width: "auto", height: "60rem" }}>
            <Row>
            <Col sm={2}></Col>
                <Col style={{marginTop: "30px" }}>
                    <text style={{ fontSize: "30px" }}>Edit your question</text>
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
                            {body && (<EditQ onChangeData={onChangeData} body={body} onChange={onChange}/>)}
                            <Card.Title>
                                Tags
                            </Card.Title>
                            <text>Add up to 5 tags to describe what your question is about</text>
                            <input disabled={true} name="tags" value={tags} ></input>
                        </div>
                    </Card>
                    <Button style={{marginTop :"20px"}} onClick={(e)=>updateQuestion(e)}>Update question</Button>
                </Col>
            </Row>
        </div>
    )
}

export default EditQuestion