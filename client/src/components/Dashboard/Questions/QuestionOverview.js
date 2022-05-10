import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './styles.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import img1 from '../../images/santhoshProfPic.jpg'
import axios from 'axios';
import Constants from './../../util/Constants.json'
import { useParams } from 'react-router';
import moment from 'moment'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import AskQ from './AskQ.js'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

toast.configure()


const QuestionOverview = () => {
  const navigate = useNavigate();
  
  const user = useSelector(state => state.UserSlice)

  const params = useParams()
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])
  const [comments, setComments] = useState([])
  const [answerForm, setAnswerForm] = useState({
    title: "",
    body: "",
    type: "ANSWER",
    tags: "",
    question_id: "",
    parent_id: "",
    status: "ACTIVE",
    answers_count: 0
  })
  const [message, setMessage] = useState("");
  const [commentForm, setCommentForm] = useState()
  const [isQuestionBookMarked, setIsQuestionBookMarked] = useState(false)
  const [enableComment, setEnableComment] = useState(false)
  const [flag, setFlag] = useState(true)

  const { title, body } = answerForm

  const onChangeAnswerBody = (e) => {
    e.preventDefault()
    setAnswerForm({ ...answerForm, [e.target.name]: e.target.value })
  }

  const postAnswer = async (e) => {
    e.preventDefault()
    // console.log(answerForm)
    answerForm.title = question.title
    answerForm.question_id = answerForm.parent_id = question.id
    answerForm.answers_count = question.answers_count
    const res = await axios.post(`${Constants.uri}/api/post/answer`, answerForm, { withCredentials: true })
    if (res.data) {
      toast.success("Posted your answer!")
      window.location.reload()
    }
  }


  useEffect(() => {
    async function getQuestion() {
      const res = await axios.get(`${Constants.uri}/api/post/${params.qid}`, { withCredentials: true })
      console.log(res.data)
      setQuestion(res.data)
      setAnswers(res.data.answers)
      setComments(res.data.Comments)
      if (res.data.bookmarked) {
        setIsQuestionBookMarked(true)
      }
    }
    getQuestion()
  }, [flag])

  const bookMarkQuestion = async () => {
    if (!isQuestionBookMarked) {
      const res = await axios.post(`${Constants.uri}/api/post/bookmark/${question.id}`, {}, { withCredentials: true })
      if (res.data) {
        toast.success('Quesition added to Bookmarks')
        window.location.reload()
      }
    } else {
      const res = await axios.post(`${Constants.uri}/api/post/unbookmark/${question.id}`, {}, { withCredentials: true })
      if (res) {
        toast.success("Question removed from Bookmarks")
        isQuestionBookMarked(false)
        window.location.reload()
      }
    }
  }

  const addComment = async () => {
    const res = await axios.post(`${Constants.uri}/api/post/${question.id}/comment`, { content: commentForm }, { withCredentials: true })
    window.location.reload()
  }

  const openTag = (tag) => {
    navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=${false}`);
  }

  const voteQuestion = async (voteType) => {
    const res = await axios.post(`${Constants.uri}/api/post/${question.id}/vote`, { type: voteType }, { withCredentials: true })
    console.log(res.data)
    if (res.data) {
      setFlag(!flag)
      if (voteType == "UPVOTE")
        toast.success("Up voted the question")
      else
        toast.success("Down voted the question")
    }
  }

  const acceptAnswer = async (answer) => {
    const res = await axios.post(`${Constants.uri}/api/post/acceptAnswer`, { answerId: answer.id }, { withCredentials: true })
    console.log(res)
    if (res) {
      toast.success("Accepeted answer")
    }
  }

  const editQuestion = () => {
    navigate(`/editQuestion/${params.qid}`)
  }



  const onChange = (value) => {
    setAnswerForm({
      ...answerForm,
      body: value
    })
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
                Modified {moment(question.modified_date).fromNow()} &nbsp; &nbsp; &nbsp; &nbsp; 
                <Button style={{width:'auto'}} className="btn btn-secondary" onClick={()=>editQuestion()}>Edit Question</Button>
                </Row>
              <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
              <Row>
                <Col sm={1}>
                  {question.score === 1 ? <div className='uptriangleonclick' onClick={() => voteQuestion("UPVOTE")}></div> : <div className='uptriangle' onClick={() => voteQuestion("UPVOTE")}></div>}
                  <div>&nbsp;&nbsp;{question.score}</div>
                  {question.score === -1 ? <div className='downtriangleonclick' onClick={() => voteQuestion("DOWNVOTE")}></div> : <div className='downtriangle' onClick={() => voteQuestion("DOWNVOTE")}></div>}
                  <div style={{ margin: "8px", cursor: "pointer" }}><i className="fa-solid fa-bookmark" onClick={() => bookMarkQuestion()} style={{ color: isQuestionBookMarked ? "#fce303" : "#c2d6d6" }}></i></div>
                  <div style={{ margin: "8px", cursor: "pointer" }}><i class="fa-solid fa-clock" style={{ color: "#c2d6d6" }}></i></div>
                </Col>
                <Col sm={7}>
                  <Card style={{ width: "40rem", height: "auto", backgroundColor: "#e7f4f4" }}>
                    <text>
                      {parse(question.body)}
                    </text>
                  </Card>
                  <Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <Col>
                      {
                        question.tags.split(",").map(tag => (<button onClick={() => openTag(tag)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</button>))
                      }
                    </Col>
                  </Row>
                </Col>
                <Col sm={1}></Col>
                <Col>
                  <Card style={{ backgroundColor: "#b3f0ff" }}>
                    <Card.Title><span style={{ fontSize: 12, padding: 10 }} className='text-muted'>asked on {question.created_date.split('T')[0]}</span></Card.Title>
                    <Row>
                      <Col sm={3}><img style={{ width: "2rem", height: "2rem", padding: 3 }} src={question.User.photo}></img></Col>
                      <Col>
                        <Row><Link to={`/User/${question.User.id}`} style={{ textDecoration: 'none', fontSize: 13 }}>{question.User.username}</Link></Row>
                        <Row>
                          <Col sm={4}>4321</Col>
                          <Col><span><i class="fa fa-circle" style={{ color: 'gold', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                            <span><i class="fa fa-circle" style={{ color: '#C0C0C0', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                            <span><i class="fa fa-circle" style={{ color: '#CD7F32', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={1}></Col>
                <Col sm={8}>
                  <Row>
                    {comments && comments.length > 0 && comments.map(comment => (
                      <>
                        <Col sm={8}>
                          <span className='text-muted' style={{ fontSize: 13 }}>{comment.content}</span>
                        </Col>
                        <Col sm={1}><Link to={`/User/${comment.user_id}`} style={{ textDecoration: "none", fontSize: 11 }}>{comment.user_display_name}</Link></Col>
                        <Col><span style={{ textDecoration: "none", fontSize: 11 }}>{comment.posted_on}</span></Col>
                        <hr />
                      </>
                    ))}
                  </Row>
                  <Row>
                    <span className='text-muted' style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setEnableComment(true)}>Add a comment</span>
                    {enableComment && (
                      <>
                        <span><textarea name="comment" value={commentForm} onChange={(e) => setCommentForm(e.target.value)} /></span>
                        <span><Button className='btn btn-secondary' onClick={() => addComment()} style={{ padding: 0 }}>Post</Button></span>
                      </>
                    )}
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
                    {question.accepted_answer_id == answer.id && (
                      <div style={{ color: 'green', fontSize: 30 }}><i class="fa fa-check" aria-hidden="true"></i></div>
                    )}
                  </Col>
                  <Col>
                    <Card style={{ width: "40rem", height: "auto", backgroundColor: " #e6e6e6" }}>
                      <text>
                        {parse(answer.body)}
                      </text>
                    </Card>
                    <Row>
                      <Col sm={3}>
                      </Col>
                      <Col>
                        <Button className='btn btn-success rounded-pill' onClick={() => acceptAnswer(answer)} style={{ width: 'auto', height: 'auto', textAlign: 'left' }}>Accept answer</Button>
                      </Col>
                      
                    </Row>
                  </Col>
                  <Col>
                  <Card>
                          <Card.Title><span style={{ fontSize: 12 }}>Answered {moment(answer.modified_date.split(',')[0]).format("MMM Do YY")}</span></Card.Title>
                          <Row>
                            <Col sm={3}><img style={{ width: "2rem", height: "2rem" }} src={img1}></img></Col>
                            <Col>
                              <Row>{answer.User && (<text>{answer.User.username}</text>)}</Row>
                              <Row>
                                <Col sm={5}>432</Col>
                                <Col><span><i class="fa fa-circle" style={{ color: 'gold', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                                  <span><i class="fa fa-circle" style={{ color: '#C0C0C0', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                                  <span><i class="fa fa-circle" style={{ color: '#CD7F32', fontSize: 10 }} aria-hidden="true"></i>&nbsp;{question.User.gold_badges_count}&nbsp;</span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                        </Card>
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
          <Row>
            <Col sm={8}><AskQ onChangeData={onChangeAnswerBody} onChange={onChange} />
            </Col>
          </Row>
          <Row>
            <Col sm={3}><Button onClick={(e) => postAnswer(e)}>Post Your Answer</Button></Col>

          </Row>

        </Col>
      </Row>
    </div>
  )
}

export default QuestionOverview