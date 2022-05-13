import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import questionlogo from '../../images/questionlogo1.PNG'
import Constants from './../../util/Constants.json'
import RichTextEditor, { stateToHTML } from 'react-rte'
import AskQ from './AskQ.js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Login from './../../Login/Login'
import Cookies from 'js-cookie'
import save from '../../util/Util.js'
import Compress from 'compress.js'
const AskQuestion = () => {
    const compress = new Compress()
    const obj = useSelector(state => state.QuestionBodySlice);
    const [questionForm, setQuestionFormData] = useState({
        title: "",
        body: "",
        tags: "",
        type: "QUESTION"
    })

    const { title, body, tags } = questionForm
    const [modalShow, setModalShow] = useState(false)
    const [image, setImage] = useState({ preview: "", raw: "" })
    const [imgurl,setimgurl] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (!Cookies.get('ID')) {
            setModalShow(true)
            toast('Please Login to ask a question')
        }
    }, [])

    const onChangeData = async (e) => {
        e.preventDefault()
        setQuestionFormData({ ...questionForm, [e.target.name]: e.target.value })
        console.log(e)
    }

    const askQuestion = async (e) => {
        e.preventDefault()
        // console.log(questionForm)
        console.log("posting quesrion")

        axios.defaults.withCredentials = true
        const res = await axios.post(`${Constants.uri}/api/post/question`, questionForm, {
            validateStatus: status => status < 500
        })
        if (res.status === 200) {
            toast.success('Posted new question successfully!', { position: "top-center" });
            navigate("/Dashboard")
        } else {
            if (res.data.message.error) {
                toast.error(`${res.data.message.error}`, { position: "top-center" });
            } else {
                toast.error('Server Error', { position: "top-center" })
            }

        }


    }

    const onChange = (value) => {
        setQuestionFormData({
            ...questionForm,
            body: value
        })
    }

    const handleChange = async (e)=>{
    if (e.target.files.length) {
        // console.log(e.target.files[0])
        // const files = [e.target.files[0]]
    //    const result = await compress.compress(files, {
    //         size: 4, // the max size in MB, defaults to 2MB
    //         quality: .75, // the quality of the image, max is 1,
    //         maxWidth: 920, // the max width of the output image, defaults to 1920px
    //         maxHeight: 920, // the max height of the output image, defaults to 1920px
    //         resize: true, // defaults to true, set false if you do not want to resize the image width and height
    //         rotate: false, // See the rotation section below
    //       })
        //   console.log("outside")
      var imguser = await save(URL.createObjectURL(e.target.files[0]), e.target.files[0])
    //   console.log(imguser);
        setimgurl(imguser)
    }
    }
    return (
        <div style={{ backgroundColor: "#f2f2f2", width: "auto", height: "60rem" }}>
            <Row>
                <Col sm={2}></Col>
                <Col style={{ marginTop: "30px" }}>
                    <text style={{ fontSize: "30px" }}>Ask a public question</text>
                </Col>
                <Col>
                    <img style={{ width: "33rem" }} src={questionlogo}></img>
                </Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col>
                    <Card style={{ width: "53rem" }}>
                        <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
                            <Card.Title>
                                Title
                            </Card.Title>
                            <text>Be specific and imagine you’re asking a question to another person</text>
                            <input style={{ marginBottom: "20px" }} name="title" value={title} onChange={(e) => onChangeData(e)}></input>
                            <Card.Title>Body</Card.Title>
                            <text>Include all the information someone would need to answer your question</text>
                            {//<RichTextEditor value={state} onChange={onChange} />
                            }
                            <AskQ onChangeData={onChangeData} onChange={onChange} />
                            <Col sm={4}>
                                <div>
                                    <text>Upload Image</text>
                                </div>
                            </Col>
                            <Col sm={3}><input
                                type="file"
                                id="upload-button"
                                onChange={handleChange}
                            />
                            </Col>
                            <text style={{fontWeight:"bold", fontSize:"13px"}}>{imgurl}</text>
                            {
                                imgurl &&<span style={{fontSize:"13px"}}>(Copy this URL and paste it in Image field)</span>
                            }
                            
                            <br />
                            <Card.Title>
                                Tags
                            </Card.Title>
                            <text>Add up to 5 tags to describe what your question is about</text>
                            <input name="tags" value={tags} placeholder="Eg: java,android,oop" onChange={(e) => onChangeData(e)}></input>
                        </div>
                    </Card>
                    <Button style={{ marginTop: "20px" }} onClick={(e) => askQuestion(e)}>Post your question</Button>
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