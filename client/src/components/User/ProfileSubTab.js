import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import goldbadge from '../images/goldbadge.PNG'
import silverbadge from '../images/silverbadge.PNG'
import bronzebadge from '../images/bronzebadge.PNG'
import Axios from 'axios'
import Constants from '../util/Constants.json'
const ProfileSubTab = () => {
    const obj = useSelector(state => state.UserSlice)
    const { gold_badges_count,about, silver_badges_count,bronzeBadges,silverBadges,goldBadges, bronze_badges_count,reputation,userReach ,answersCount,questionsCount} = obj.value
    const arr = [1, 2, 3];
    const [title, settitle] = useState("posts")
    const [newtitle,setnewtitle] = useState("")
    const [topposts, settopposts] = useState([]);

    const allAction = async () => {
        settitle("posts")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/profile/top_posts?postType=ALL&sortValue=SCORE`,{
              withCredentials: true
            });
        settopposts(result.data);
    }
    const questionsAction = async () => {
        settitle("Questions")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/profile/top_posts?postType=QUESTION&sortValue=SCORE`,{
            withCredentials: true
          });
      settopposts(result.data);
    }
    const answersAction = async () => {
        settitle("Answers")
        setnewtitle("")
        const result = await Axios.get(`${Constants.uri}/api/users/profile/top_posts?postType=ANSWER&sortValue=SCORE`,{
            withCredentials: true
          });
      settopposts(result.data);
    }
    const scoreAction = async () => {
        setnewtitle( "Top")
        var tit = title == "posts" ? "ALL" : title=="Answers" ? "ANSWER" : "QUESTION"
        
        const result = await Axios.get(`${Constants.uri}/api/users/profile/top_posts?postType=${tit}&sortValue=SCORE`,{
            withCredentials: true
          });
      settopposts(result.data);
    }
    const newestAction = async () => {
        setnewtitle( "Newest")
        var tit = title == "posts" ? "ALL" : title=="Answers" ? "ANSWER" : "QUESTION"
        const result = await Axios.get(`${Constants.uri}/api/users/profile/top_posts?postType=${tit}&sortValue=NEWEST`,{
            withCredentials: true
          });
        settopposts(result.data);
        
    }

    const viewAllBadges =()=>{

    }

    const viewAllTags =()=>{

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
                        </Row>:
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
                    <Row><Col sm={3}><h3>Badges</h3></Col><Col  style={{marginTop:"6px", cursor:"pointer"}}><text onClick={viewAllBadges}>view all badges</text></Col> </Row>
                    {
                        gold_badges_count > 0 || silver_badges_count > 0 || bronze_badges_count > 0 ?
                        <div>
                        
                            <Card style={{ width: "47rem", height: "7rem", backgroundColor: "white", border: "0" }}>
                                <Row>
                                    <Col><Card>
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
                                                    <Col>{i.name}</Col>
                                                    <Col></Col>
                                                    <Col>{i.awarded_on}</Col>
                                                </Row>
                                            ))
                                        }
                                    </Card></Col>
                                    <Col><Card>
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
                                                    <Col>{i.name}</Col>
                                                    <Col></Col>
                                                    <Col>{i.awarded_on}</Col>
                                                </Row>
                                            ))
                                        }
                                    </Card></Col>
                                    <Col><Card>
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
                                                    <Col>{i.name}</Col>
                                                    <Col></Col>
                                                    <Col>{i.awarded_on}</Col>
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
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>

                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem", marginTop: "3rem" }}>
                <Row><Col sm={3}><h3>Tags</h3></Col><Col  style={{marginTop:"6px", cursor:"pointer"}}><text onClick={viewAllTags}>view all Tags</text></Col> </Row>

                    {
                        arr.map((i) => (
                            <Card style={{ width: "47rem", height: "3rem" }}>
                                <Card.Body>
                                    <Row>
                                        <Col>python</Col>
                                        <Col sm={2}></Col>
                                        <Col>2,848 score 2,012 posts 84 posts %</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    }

                </Col>
            </Row>
            <Row style={{ marginTop: "0rem" }}>
                <Col sm={3}>

                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem", marginTop: "3rem" }}>
                    <Row style={{ width: "47rem" }}>
                        <Col sm={5}><h3>{newtitle} {newtitle.length!=0 ?<text></text> : <text>Top</text>}  {title}</h3></Col>
                        <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
                            <button style={title=="posts" ? { border: "0" ,backgroundColor :"green"} : {border: "0"}} onClick={allAction}>All</button>
                            <button style={title=="Questions" ? { border: "0" ,backgroundColor :"green"} : {border: "0"}} onClick={questionsAction}>Questions</button>
                            <button style={title=="Answers" ? { border: "0" ,marginRight: "1rem",backgroundColor :"green"} : {border: "0",marginRight: "1rem"}} onClick={answersAction}>Answers</button>
                            <button style={!newtitle.includes("Newest") ? { border: "0" ,backgroundColor :"green"} : {border: "0"}} onClick={scoreAction}>Score</button>
                            <button style={newtitle.includes("Newest") ? { border: "0" ,backgroundColor :"green"} : {border: "0"}} onClick={newestAction}>Newest</button>

                        </Col>

                    </Row>

                    {
                        arr.map((i) => (
                            <Card style={{ width: "47rem", height: "auto" }}>
                                <Card.Body>
                                    <Row>
                                        <Col sm={2}>
                                        <Row>
                                        <Col sm={3}><i class="fa-brands fa-adn" style={{color:"green"}}></i></Col>
                                        <Col sm={6}><Button variant='success'>243</Button></Col>
                                        </Row>
                                        </Col>
                                        <Col sm={7}>How to interpret dplyr message `summarise()` regrouping output by 'x' (override with `.groups` argument)?</Col>
                                        <Col>Aug 18, 2015</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                    }

                </Col>
            </Row>
        </div>
    )
}

export default ProfileSubTab