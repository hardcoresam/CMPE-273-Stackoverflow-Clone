import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import goldbadge from '../images/goldbadge.PNG'
import silverbadge from '../images/silverbadge.PNG'
import bronzebadge from '../images/bronzebadge.PNG'
import Axios from 'axios'
import { useParams } from 'react-router'
import moment from 'moment'
import Constants from '../util/Constants.json'
import { useNavigate } from 'react-router'
import { statusReducer } from '../../features/UserActivitySlice'
const ProfileSubTab = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const obj = useSelector(state => state.UserSlice)
    const { gold_badges_count, about, silver_badges_count, bronzeBadges, silverBadges, goldBadges, bronze_badges_count, reputation, userReach, answersCount, questionsCount } = obj.value
    const arr = [1, 2, 3];
    const [title, settitle] = useState("posts")
    const [newtitle, setnewtitle] = useState("")
    const [topposts, settopposts] = useState([]);
    const [toptags, settoptags] = useState([]);
    const { userid } = useParams();

    useEffect(() => {
        async function testFunc() {
            const tagresult = await Axios.get(`${Constants.uri}/api/users/${userid}/activity/tags`, {
                withCredentials: true
            });
            console.log(tagresult)
            settoptags(tagresult.data)

            const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=ALL&sortValue=SCORE`, {
                withCredentials: true
            });
            settopposts(result.data);
            console.log(result)
        }
        testFunc()



    }, [props.userid])


    const allAction = async () => {
        settitle("posts")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=ALL&sortValue=SCORE`, {
            withCredentials: true
        });
        settopposts(result.data);
    }
    const questionsAction = async () => {
        settitle("Questions")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=QUESTION&sortValue=SCORE`, {
            withCredentials: true
        });
        settopposts(result.data);
    }
    const answersAction = async () => {
        settitle("Answers")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=ANSWER&sortValue=SCORE`, {
            withCredentials: true
        });
        settopposts(result.data);
    }
    const scoreAction = async () => {
        setnewtitle("Top")
        var tit = title == "posts" ? "ALL" : title == "Answers" ? "ANSWER" : "QUESTION"

        const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=${tit}&sortValue=SCORE`, {
            withCredentials: true
        });
        settopposts(result.data);
    }
    const newestAction = async () => {
        setnewtitle("Newest")
        var tit = title == "posts" ? "ALL" : title == "Answers" ? "ANSWER" : "QUESTION"
        const result = await Axios.get(`${Constants.uri}/api/users/${userid}/profile/top_posts?postType=${tit}&sortValue=NEWEST`, {
            withCredentials: true
        });
        settopposts(result.data);

    }

    const viewAllBadges = () => {     
        dispatch(statusReducer("Badges"))
        props.settabflag(false)
    }

    const viewAllTags = () => {
        dispatch(statusReducer("Tags"))
        props.settabflag(false)
 
    }

    const openPost = (id)=>{
        navigate(`/questions/${id}`);
    }
    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${true}&filterBy=${false}`);
      }
    return (
        <div>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <h3>Stats</h3>
                    <Card style={{ width: "16rem", height: "9rem" }}>
                        <Card.Body>
                            <Row>
                                <Col sm={6}>
                                    <Row>{reputation}</Row>
                                    <Row>reputation</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>{userReach}</Row>
                                    <Row>reached</Row>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "1rem" }}>
                                <Col sm={6}>
                                    <Row>{answersCount}</Row>
                                    <Row>answers</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>{questionsCount}</Row>
                                    <Row>questions</Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={2}></Col>
                <Col sm={3} style={{ marginLeft: "-5rem" }}>
                    <h3>About</h3>
                    <Card style={{ width: "47rem", height: "7rem", backgroundColor: "MintCream" }}>
                        <Card.Body>
                            {
                                !about ? <Row>
                                    <text>Your about me section is currently blank. Would you like to add one? Edit profile</text>
                                </Row> :
                                    <Row>
                                        <text>{about}</text>
                                    </Row>
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>

                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem" }}>
                    <Row><Col sm={3}><h3>Badges</h3></Col><Col style={{ marginTop: "6px", cursor: "pointer" }}><text onClick={viewAllBadges}>view all badges</text></Col> </Row>
                    {
                        gold_badges_count > 0 || silver_badges_count > 0 || bronze_badges_count > 0 ?
                            <div>

                                <Card style={{ width: "48rem", height: "13rem", backgroundColor: "white", border: "0", }}>
                                    <Row>
                                        <Col><Card style={{ minHeight: "11rem", overflow: "hidden" }}>
                                            <Row>
                                                <Col sm={6}><img style={{ width: "5rem", height: "5rem" }} src={goldbadge}></img></Col>

                                                <Col>
                                                    <Row><text>{gold_badges_count}</text></Row>
                                                    <Row><text>gold badges</text></Row>
                                                </Col>

                                            </Row>
                                            {
                                                goldBadges.map((i) => (
                                                    <Row>
                                                        <Col sm={7} style={{ fontSize: "14px" }}><text style={{ color: "gold" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text>{i.name}</Col>

                                                        <Col style={{ fontSize: "10px" }}>{moment(i.awarded_on).fromNow()}</Col>
                                                    </Row>
                                                ))
                                            }
                                        </Card></Col>
                                        <Col><Card style={{ minHeight: "11rem", overflow: "hidden" }}>
                                            <Row>
                                                <Col><img style={{ width: "5rem", height: "5rem" }} src={silverbadge}></img></Col>

                                                <Col>
                                                    <Row><text>{silver_badges_count}</text></Row>
                                                    <Row><text>silver badges</text></Row>
                                                </Col>

                                            </Row>
                                            {
                                                silverBadges.map((i) => (
                                                    <Row>
                                                        <Col sm={7} style={{ fontSize: "14px" }}><text style={{ color: "silver" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text>{i.name}</Col>
                                                        <Col style={{ fontSize: "10px" }}>{moment(i.awarded_on).fromNow()}</Col>
                                                    </Row>
                                                ))
                                            }
                                        </Card></Col>
                                        <Col><Card style={{ minHeight: "11rem", overflow: "hidden" }}>
                                            <Row>
                                                <Col sm={5}><img style={{ width: "5rem", height: "5rem" }} src={bronzebadge}></img></Col>

                                                <Col>
                                                    <Row><text>{bronze_badges_count}</text></Row>
                                                    <Row><text>bronze badges</text></Row>
                                                </Col>

                                            </Row>
                                            {
                                                bronzeBadges.map((i) => (
                                                    <Row>
                                                        <Col sm={7} style={{ fontSize: "14px" }}><text style={{ color: "bronze" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text>{i.name}</Col>
                                                        <Col style={{ fontSize: "10px" }}>{moment(i.awarded_on).format("MMM Do YY")}</Col>
                                                    </Row>
                                                ))
                                            }
                                        </Card></Col>

                                    </Row>
                                </Card>
                            </div>
                            :
                            <Card style={{ width: "47rem", height: "7rem", backgroundColor: "MintCream" }}>
                                <Card.Body>
                                    <Row>
                                        <text>You have not earned any badges.</text>
                                    </Row>
                                </Card.Body>
                            </Card>
                    }

                </Col>
            </Row>
            {
                toptags.length>0 && 
                <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>

                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem", marginTop: "3rem" }}>
                    <Row><Col sm={3}><h3>Tags</h3></Col><Col style={{ marginTop: "6px", cursor: "pointer" }}><text onClick={viewAllTags}>view all Tags</text></Col> </Row>

                    {
                        toptags.map((i) => (
                            <Card style={{ width: "47rem", height: "3rem" }}>
                                <Card.Body>
                                    <Row>
                                        <Col style={{cursor:"pointer"}} onClick={() => openTag(i.name)}>{i.name}</Col>
                                        <Col sm={2}></Col>
                                        <Col>{i.score} score {i.totalPosts} posts 84 posts %</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    }

                </Col>
            </Row>
            }
            {
                <Row style={{ marginTop: "0rem" }}>
                <Col sm={3}>

                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem", marginTop: "3rem" }}>
                    <Row style={{ width: "47rem" }}>
                        <Col sm={5}><h3>{newtitle} {newtitle.length != 0 ? <text></text> : <text>Top</text>}  {title}</h3></Col>
                        <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
                            <button style={title == "posts" ? { border: "0", backgroundColor: "green" } : { border: "0" }} onClick={allAction}>All</button>
                            <button style={title == "Questions" ? { border: "0", backgroundColor: "green" } : { border: "0" }} onClick={questionsAction}>Questions</button>
                            <button style={title == "Answers" ? { border: "0", marginRight: "1rem", backgroundColor: "green" } : { border: "0", marginRight: "1rem" }} onClick={answersAction}>Answers</button>
                            <button style={!newtitle.includes("Newest") ? { border: "0", backgroundColor: "green" } : { border: "0" }} onClick={scoreAction}>Score</button>
                            <button style={newtitle.includes("Newest") ? { border: "0", backgroundColor: "green" } : { border: "0" }} onClick={newestAction}>Newest</button>

                        </Col>

                    </Row>

                    {
                        topposts.length>0 ?
                        topposts.map((i) => (
                            <Card style={{ width: "47rem", height: "auto"}}>
                                <Card.Body>
                                    <Row>
                                        <Col sm={2}>
                                            <Row>
                                            {
                                                i.type==="QUESTION" ? ( i.accepted_answer_id===null ? <Col sm={3}><i class="fa fa-question-circle" aria-hidden="true"></i></Col> :<Col sm={3}><i class="fa fa-question-circle" aria-hidden="true" style={{color:"green"}}></i></Col>) :
                                                (i.accepted_answer_id===null ? <Col sm={3}><i class="fa-brands fa-adn"></i></Col> : <Col sm={3}><i class="fa-brands fa-adn" style={{color:"green"}}></i></Col>)
                                            }
                                            {
                                                i.accepted_answer_id===null ?<Col sm={6}><Button style={{backgroundColor:"white", color:"black", borderColor:"black"}}>{i.score}</Button></Col>:<Col sm={6}><Button variant='success'>{i.score}</Button></Col>
                                            }
                                                
                                            </Row>
                                        </Col>
                                        <Col style={{cursor:"pointer"}} onClick={() =>openPost(i.id)} sm={7}>{i.title}</Col>
                                        <Col>{moment(i.modified_date).fromNow()}</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                        :
                        <Card style={{ width: "47rem", height: "auto"}}>
                                <Card.Body>
                                    <Row>
                                        <h5>No Data</h5>
                                    </Row>
                                </Card.Body>
                            </Card>
                    }

                </Col>
            </Row>
            }
            
        </div>
    )
}

export default ProfileSubTab