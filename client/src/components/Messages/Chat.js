import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import img from '../images/messagespicture.jpg'
import { useParams } from 'react-router'
import axios from 'axios'
import Constants from './../util/Constants.json'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Chat = () => {

    const params = useParams()

    const [messages, setMessages] = useState([])
    const obj = useSelector(state => state.UserSlice)
    const { username } = obj.value

    const [recipient,setRecipient] = useState("")

    const [newMessage,setNewMessage] = useState("")

    const [sent,setSent] = useState(false)

    const onChangeMessageData = (e) => {
        e.preventDefault()
        setNewMessage(e.target.value)
    }

    const sendMessage = async () => {
        let from = username
        let to=""
        if(messages[0].from == username){
            to = messages[0].to
        }else{
            to = messages[0].from
        }
        const res = await axios.post(`${Constants.uri}/api/chat/sendMessage`,{to,from,content:newMessage},{withCredentials:true})
        setSent(!sent)
    }


    useEffect(() => {
        const room_id = params.roomId
        async function getMessages() {
            const res = await axios.post(`${Constants.uri}/api/chat/getAllMessages`, { room_id }, { withCredentials: true })
            if(res.data[0]){
                if(res.data[0].from == username){
                    setRecipient(res.data[0].to)
                }else{
                    setRecipient(res.data[0].from)
                }
            }
            setMessages(res.data)
        }
        getMessages()
    }, [sent])

    return (
        <div>
            <Row>git 
                <Col sm={2}></Col>
                <Col>
                    <Row>
                        <Col sm={1}><img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src={img}></img></Col>
                        <Col sm={3}><h2>{recipient}</h2></Col>
                        

                    </Row>
                    <Row style={{ marginTop: "2rem" }}>
                        <Card style={{ height: "25rem", width: "38rem" }}>
                            <Row style={{ height: "23rem", width: "38rem", backgroundColor: 'black', color: 'white' }}>
                                {messages && messages.map(message => (
                                    <>
                                        <Row style={{ textAlign: message.from === username ? 'left' : 'right' }}>
                                            <span><span style={{fontWeight:'lighter'}}>{message.from}</span>&nbsp;&nbsp;{message.message} <br /><span style={{ fontStyle: 'italic', fontSize: 12, fontWeight: 'lighter' }}>{moment(message.createdAt).fromNow()}</span></span>
                                        </Row>

                                    </>
                                ))}
                            </Row>
                            <Row>
                                <Col sm={11}><input style={{ width: "34rem" }} name="newMessage" value={newMessage} onChange={(e)=>onChangeMessageData(e)}></input>
                                </Col>
                                <Col><i style={{ cursor: "pointer" }} class="fa fa-paper-plane" aria-hidden="true" onClick={()=>sendMessage()}></i></Col>
                            </Row>
                        </Card>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Chat