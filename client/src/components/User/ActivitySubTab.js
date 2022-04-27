import Axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import ItemList from './ItemList'
import Cookies from 'js-cookie'
import Constants from '../util/Constants.json'
import TagList from './TagList'
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
                        <text onClick={showAnswers}>Answers</text>
                        <text onClick={showQuestions}>Questions</text>
                        <text onClick={showTags}>Tags</text>
                        <text onClick={showBadges}>Badges</text>
                        <text onClick={showBookmarks}>Bookmarks</text>
                        <text onClick={showReputation}>Reputation</text>
                    </div>
                </Col>
                <Col>
                    <ItemList text={status} state={state}/>
                    

                    <TagList text={status} state={state} />
                </Col>
            </Row>
        </div>
    )
}

export default ActivitySubTab