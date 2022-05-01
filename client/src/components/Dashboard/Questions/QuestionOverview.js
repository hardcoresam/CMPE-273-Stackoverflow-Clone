import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './styles.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import img1 from '../../images/santhoshProfPic.jpg'
import axios from 'axios';
import Constants from './../../util/Constants.json'
import { useParams } from 'react-router';
import moment from 'moment'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const QuestionOverview = () => {

  const params = useParams()
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])
  const [answerForm, setAnswerForm] = useState({
    title:"",
    body:"",
    type:"ANSWER",
    tags:"",
    question_id:"",
    parent_id:"",
    status:"ACTIVE",
    answers_count:0
  })

  const {title,body} = answerForm

  const onChangeAnswerBody = (e) => {
    e.preventDefault()
    setAnswerForm({...answerForm,[e.target.name]:e.target.value})
  }

  const postAnswer = async (e) => {
    e.preventDefault()
    answerForm.title = question.title
    answerForm.question_id = answerForm.parent_id = question.id
    answerForm.answers_count = question.answers_count
    const res = await axios.post(`${Constants.uri}/api/post/answer`,answerForm,{withCredentials:true})
    if(res.data){
      toast.success("Posted your answer!")
      window.location.reload()
    }
  }


  useEffect(() => {
    console.log(params)
    async function getQuestion() {
      const res = await axios.get(`${Constants.uri}/api/post/${params.qid}`, { withCredentials: true })
      console.log(res.data)
      setQuestion(res.data)
      setAnswers(res.data.answers)
    }
    getQuestion()
  }, [])

  const bookMarkQuestion = async () => {
    
  }

  return (
    <div>
      <Row>
        <Col sm={2}></Col>
        <Col sm={9}>
          {question && question.User && (
            <>
              <Row><text style={{ fontSize: "2rem" }}>{question.title}</text></Row>
              <Row style={{ marginLeft: "1px" }}>Asked  {moment(question.created_date).fromNow()} &nbsp;
                Modified {moment(question.modified_date).fromNow()}</Row>
              <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
              <Row>
                    <Col sm={1}>
                      <div className='uptriangle'></div>
                      <div>{question.score}</div>
                      <div className='downtriangle'></div>
                      <div style={{ margin: "8px", cursor: "pointer" }}><i className="fa-solid fa-bookmark" onClick={()=>bookMarkQuestion()} style={{ color: "#c2d6d6" }}></i></div>
                      <div style={{ margin: "8px", cursor: "pointer" }}><i class="fa-solid fa-clock" style={{ color: "#c2d6d6" }}></i></div>
                    </Col>
                    <Col>
                      <Card style={{ width: "40rem", height: "auto", backgroundColor: "#e7f4f4" }}>
                        <text> 
                            {question.body}
                        </text>
                      </Card>
                      <Row>
                        <Col sm={3}>
                          {question.tags}
                        </Col>
                        <Col></Col>
                        <Col sm={3}>
                          <Card style={{ backgroundColor: "#b3f0ff" }}>
                            <Card.Title><span style={{fontSize:12}}>Asked on {question.created_date.split('T')[0]}</span></Card.Title>
                            <Row>
                              <Col sm={3}><img style={{ width: "2rem", height: "2rem" }} src={img1}></img></Col>
                              <Col>
                                <Row><text>{question.User.username}</text></Row>
                                <Row>
                                  <Col sm={5}>4321</Col>
                                  <Col>g1 s3 b3</Col>
                                </Row>
                              </Col>
                            </Row>

                          </Card>
                        </Col>
                      </Row>
                    </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <div style={{ marginTop: "5rem" }}>
        <text style={{ marginLeft: "15rem" }}>{question.answers_count} answers</text>
        {
          answers.map((answer) => (
            <Row >
              <Col sm={2}></Col>
              <Col sm={9}>

                <Row style={{ marginTop: "1rem" }}>
                  <Col sm={1}>
                    <div className='uptriangle'></div>
                    <div>{answer.score}</div>
                    <div className='downtriangle'></div>
                    <div style={{ margin: "8px", cursor: "pointer" }}><i className="fa-solid fa-bookmark" style={{ color: "#c2d6d6" }}></i></div>
                    <div style={{ margin: "8px", cursor: "pointer" }}><i class="fa-solid fa-clock" style={{ color: "#c2d6d6" }}></i></div>
                  </Col>
                  <Col>
                    <text>{answer.title}</text>
                    <Card style={{ width: "40rem", height: "auto", backgroundColor: " #e6e6e6" }}>
                      <text> 
                          {answer.body}
                      </text>
                    </Card>
                    <Row>
                      <Col sm={3}></Col>
                      <Col></Col>
                      <Col sm={3}>
                        <Card>
                          <Card.Title><span style={{fontSize:12}}>Answered on {answer.modified_date.split(',')[0]}</span></Card.Title>
                          <Row>
                            <Col sm={3}><img style={{ width: "2rem", height: "2rem" }} src={img1}></img></Col>
                            <Col>
                              <Row>{answer.User && (<text>{answer.User.username}</text>)}</Row>
                              <Row>
                                <Col sm={5}>4321</Col>
                                <Col>g1 s3 b3</Col>
                              </Row>
                            </Col>
                          </Row>

                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        }

      </div>
      <Row>
        <Col sm={3}></Col>
        <Col>
          <Row>Your Answer</Row>

          <textarea rows="6" cols="80" name="body" value={body} onChange={(e)=> onChangeAnswerBody(e)}>

          </textarea>

          <Row>
            <Col sm={3}><Button onClick={(e)=>postAnswer(e)}>Post Your Answer</Button></Col>

          </Row>

        </Col>
      </Row>
    </div>
  )
}

export default QuestionOverview