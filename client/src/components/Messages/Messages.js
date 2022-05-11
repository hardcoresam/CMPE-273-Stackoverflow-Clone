import React, { useEffect, useState } from 'react'
import { Row, Col, Card, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import img from '../images/messagespicture.jpg'
import messageimg from '../images/message.png'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Constants from './../util/Constants.json'

const Messages = () => {

    const navigate = useNavigate();

    const [chatList, setChatList] = useState([])

    const [usersList,setUsersList] = useState([])

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

    const searchUser = async (e) => {
        e.preventDefault()
        console.log(e.target.value)
        const res = await axios.get(`${Constants.uri}/api/users/filter/${e.target.value}`)
        const filteredUsers = res.data
        if (filteredUsers.length > 0) {
            setUsersList(filteredUsers)
        }
    }

    const selectUser = async (user) => {
        console.log(user)
        const res = await axios.post(`${Constants.uri}/api/chat/createChatRoom`,{user1:username,user2:user.username},{withCredentials:true})
        console.log(res)
    }



    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col>
                    <Row>
                        <Col><h5>Messages</h5></Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
                                <FormControl
                                    placeholder="Search User"
                                    onChange={(e) => { searchUser(e) }}
                                />
                            </InputGroup>
                            {usersList && usersList.length > 0 && 
                                usersList.map(user => (
                                    <Dropdown.Item eventKey="1" onClick={()=>selectUser(user)}>{user.username}</Dropdown.Item>
                                ))
                            }
                        </Col>
                    </Row>
                    {chatList.map(chat =>
                    (<Card style={{ cursor: "pointer" }} onClick={() => openUserMessageBox(chat.room_id)}>
                        <Card.Body>
                            <Row>
                                <Col sm={2}><img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src={img}></img></Col>
                                <Col><h5>{chat.participants.replace(`${username}`, '').replace(',', '')}</h5></Col>
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