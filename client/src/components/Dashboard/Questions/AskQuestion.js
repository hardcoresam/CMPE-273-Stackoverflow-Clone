import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import questionlogo from '../../images/questionlogo1.PNG'
import Constants from './../../util/Constants.json'
import RichTextEditor,{ stateToHTML } from 'react-rte'
import AskQ from './AskQ.js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Login from './../../Login/Login'
import Cookies from 'js-cookie'

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
    const [modalShow,setModalShow] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        if(!Cookies.get('ID')){
            setModalShow(true)
            toast('Please Login to ask a question')
          }
    },[])

    const onChangeData = async (e) => {
        e.preventDefault()
        setQuestionFormData({...questionForm,[e.target.name]:e.target.value})
        console.log(e)
    }

    const askQuestion = async (e) => {
        e.preventDefault()
        // console.log(questionForm)
        console.log("posting quesrion")

            axios.defaults.withCredentials = true
            const res = await axios.post(`${Constants.uri}/api/post/question`,questionForm,{
                validateStatus: status => status < 500
            })
            if(res.status === 200){
                toast.success('Posted new question successfully!', { position: "top-center" });
                navigate("/Dashboard")
            }else{
                if(res.data.message.error){
                    toast.error(`${res.data.message.error}`, { position: "top-center" });
                }else{
                    toast.error('Server Error',{ position: "top-center" })
                }

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
                            <br/>
                            <Card.Title>
                                Tags
                            </Card.Title>
                            <text>Add up to 5 tags to describe what your question is about</text>
                            <input name="tags" value={tags} placeholder="Eg: java,android,oop" onChange={(e)=>onChangeData(e)}></input>
                        </div>
                    </Card>
                    <Button style={{marginTop :"20px"}} onClick={(e)=>askQuestion(e)}>Post your question</Button>
                </Col>
            </Row>
            <Login
                show={modalShow}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default AskQuestion