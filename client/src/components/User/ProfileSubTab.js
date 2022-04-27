import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import goldbadge from '../images/goldbadge.PNG'
import silverbadge from '../images/silverbadge.PNG'
import bronzebadge from '../images/bronzebadge.PNG'
const ProfileSubTab = () => {
    const obj = useSelector(state => state.UserSlice)
    const { gold_badges_count, silver_badges_count, bronze_badges_count } = obj.value
    const arr = [1, 2, 3];
    const [title, settitle] = useState("posts")
    const [newtitle,setnewtitle] = useState("")


    const allAction = async () => {
        settitle("posts")
        setnewtitle("")
    }
    const questionsAction = async () => {
        settitle("Questions")
        setnewtitle("")
    }
    const answersAction = async () => {
        settitle("Answers")
        setnewtitle("")
    }
    const scoreAction = async () => {
        
    }
    const newestAction = async () => {
        
        setnewtitle( "Newest " + title)
        settitle("")
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
                                    <Row>1</Row>
                                    <Row>reputation</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>0</Row>
                                    <Row>reached</Row>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "1rem" }}>
                                <Col sm={6}>
                                    <Row>1</Row>
                                    <Row>answers</Row>
                                </Col>
                                <Col sm={1}>
                                    <Row>1</Row>
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
                            <Row>
                                <text>Your about me section is currently blank. Would you like to add one? Edit profile</text>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <h3>Communities</h3>
                    <Card style={{ width: "16rem", height: "4rem" }}>
                        <Card.Body>
                            Stackoverflow
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={2}></Col>
                <Col sm={7} style={{ marginLeft: "-5rem" }}>
                    <h3>Badges</h3>
                    {
                        gold_badges_count > 0 || silver_badges_count > 0 || bronze_badges_count > 0 ?
                            <Card style={{ width: "47rem", height: "7rem", backgroundColor: "white", border: "0" }}>
                                <Row>
                                    <Col><Card>
                                        <Row>
                                            <Col><img style={{ width: "5rem", height: "5rem" }} src={goldbadge}></img></Col>

                                            <Col>
                                                <Row><text>{gold_badges_count}</text></Row>
                                                <Row><text>gold badges</text></Row>
                                            </Col>

                                        </Row>
                                        {
                                            arr.map((i) => (
                                                <Row>
                                                    <Col>tag1</Col>
                                                    <Col></Col>
                                                    <Col>Apr30,2019</Col>
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
                                            arr.map((i) => (
                                                <Row>
                                                    <Col>tag1</Col>
                                                    <Col></Col>
                                                    <Col>Apr30,2019</Col>
                                                </Row>
                                            ))
                                        }
                                    </Card></Col>
                                    <Col><Card>
                                        <Row>
                                            <Col><img style={{ width: "5rem", height: "5rem" }} src={bronzebadge}></img></Col>

                                            <Col>
                                                <Row><text>{bronze_badges_count}</text></Row>
                                                <Row><text>bronze badges</text></Row>
                                            </Col>

                                        </Row>
                                        {
                                            arr.map((i) => (
                                                <Row>
                                                    <Col>tag1</Col>
                                                    <Col></Col>
                                                    <Col>Apr30,2019</Col>
                                                </Row>
                                            ))
                                        }
                                    </Card></Col>

                                </Row>
                            </Card>
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
                <Col sm={3} style={{ marginLeft: "-5rem", marginTop: "3rem" }}>
                    <h3>Top tags</h3>

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
                            <button style={{ border: "0" }} onClick={allAction}>All</button>
                            <button style={{ border: "0" }} onClick={questionsAction}>Questions</button>
                            <button style={{ border: "0", marginRight: "1rem" }} onClick={answersAction}>Answers</button>
                            <button style={{ border: "0" }} onClick={scoreAction}>Score</button>
                            <button style={{ border: "0" }} onClick={newestAction}>Newest</button>

                        </Col>

                    </Row>

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
        </div>
    )
}

export default ProfileSubTab