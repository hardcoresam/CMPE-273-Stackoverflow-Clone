import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import img from '../images/messagespicture.jpg'
import messageimg from '../images/message.png'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Constants from './../util/Constants.json'

const Messages = () => {

    const navigate = useNavigate();

    const [chatList, setChatList] = useState([])

    const obj = useSelector(state => state.UserSlice)
    const { username } = obj.value
    useEffect(() => {
        console.log(username)
        async function getChatList() {
            const res = await axios.post(`${Constants.uri}/api/chat/getChatList`, { username }, { withCredentials: true })
            setChatList(res.data)
        }
        getChatList()
    }, [])

    const openUserMessageBox = (room_id) => {
        navigate(`/messages/chat/${room_id}`)
    }




    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col>
                    <Row>
                        <Col></Col>
                        <Col><h3>Messages</h3></Col>
                        <Col></Col>
                    </Row>
                    {chatList.map(chat =>
                    (<Card style={{ cursor: "pointer" }} onClick={() => openUserMessageBox(chat.room_id)}>
                        <Card.Body>
                            <Row>
                                <Col sm={3}><img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src={img}></img></Col>
                                <Col><h4>{chat.participants.replace(`${username}`,'').replace(',','')}</h4></Col>
                            </Row>
                        </Card.Body>
                    </Card>))}

                </Col>
                <Col sm={6}>
                    <img style={{ width: "38rem", height: "auto" }} src={messageimg}></img>
                </Col>
            </Row>
        </div>
    )
}

export default Messages