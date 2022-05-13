import React, { useEffect, useState } from 'react'
import { Row, Col, Card, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import img from '../images/messagespicture.jpg'
import messageimg from '../images/message.png'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Constants from './../util/Constants.json'
import Cookies from 'js-cookie'

const Messages = () => {

    const navigate = useNavigate();

    const [chatList, setChatList] = useState([])

    const [usersList,setUsersList] = useState([])

    const  username  = Cookies.get("Username")
    
    useEffect(() => {
        async function getChatList() {
            const res = await axios.post(`${Constants.uri}/api/chat/getChatList`, { username }, { withCredentials: true })
            setChatList(res.data)
        }
        console.log(usersList.length)
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
        try {
            const res = await axios.post(`${Constants.uri}/api/chat/createChatRoom`,{user1:username,user2:user.username},{withCredentials:true})
            if(res){
                navigate(`/messages/chat/${res.data.room_id}`)
            }
        } catch (error) {
            setUsersList(0)
        }
    }



    return (
       
    )
}

export default Messages