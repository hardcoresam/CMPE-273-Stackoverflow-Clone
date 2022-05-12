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
        console.log("Sending from: ", username)
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
       
    )
}

export default Chat