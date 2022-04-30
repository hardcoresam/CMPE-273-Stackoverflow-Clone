import Axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import ItemList from './ItemList'
import Cookies from 'js-cookie'
import Constants from '../util/Constants.json'
import TagList from './TagList'
import BadgeList from './BadgeList'
const ActivitySubTab = () => {

    const [status, setstatus] = useState("Answers")
    const [state, setstate] = useState([]);
    // const [tagstate,settagstate] = useState([]);
    const userid = Cookies
    const showAnswers = async () => {
        setstatus("Answers")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
            withCredentials: true
        }).then((r) => {
            setstate(r.data)
        })
    }
    const showQuestions = async () => {
        setstatus("Questions")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/questions`, {
            withCredentials: true
        }).then((r) => {
            setstate(r.data)
        })
    }
    const showTags = async () => {
        setstatus("Tags")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/tags`, {
            withCredentials: true
        }).then((r) => {
            setstate(r.data)
        })
    }
    const showReputation = async () => {
        setstatus("Reputation")
    }
    const showBadges = async () => {
        setstatus("Badges")
    }
    const showBookmarks = async () => {
        setstatus("Bookmarks")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/bookmakrs`, {
            withCredentials: true
        }).then((r) => {
            setstate(r.data)
        })
    }

    return (
        <div>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <div style={{ display: "flex", flexDirection: "column", height: "12rem", justifyContent: "space-between", cursor: "pointer" }}>
                        <text style={status=="Answers" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem", color:"white"} : {border: "0"}} onClick={showAnswers}>Answers</text>
                        <text style={status=="Questions" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem",color:"white"} : {border: "0"}} onClick={showQuestions}>Questions</text>
                        <text style={status=="Tags" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem",color:"white"} : {border: "0"}} onClick={showTags}>Tags</text>
                        <text style={status=="Badges" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem",color:"white"} : {border: "0"}} onClick={showBadges}>Badges</text>
                        <text style={status=="Bookmarks" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem",color:"white"} : {border: "0"}} onClick={showBookmarks}>Bookmarks</text>
                        <text style={status=="Reputation" ? {borderRadius:"5px", backgroundColor :"green", width:"5rem",color:"white"} : {border: "0"}} onClick={showReputation}>Reputation</text>
                    </div>
                </Col>
                <Col>

                    {
                        (status === "Answers" || status === "Questions" || status === "Bookmarks") && <ItemList text={status} state={state} />
                    }

                    {
                        status === "Tags" && <TagList text={status} state={state} />
                    }

                    {
                        status === "Badges" && <BadgeList text={status} state={state} />
                    }

                    
                </Col>
            </Row>
        </div>
    )
}

export default ActivitySubTab