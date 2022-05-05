import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import ItemList from './ItemList'
import AnswerList from './AnswerList'
import Cookies from 'js-cookie'
import Constants from '../util/Constants.json'
import TagList from './TagList'
import BadgeList from './BadgeList'
import Reputation from './Reputation'
import { useParams } from 'react-router-dom'
import BookmarkList from './BookmarkList'
const ActivitySubTab = () => {

    const [status, setstatus] = useState("Answers")
    const [state, setstate] = useState([]); //storing questions state
    const [state2, setstate2] = useState([]); // storing answers state 
    const [state3, setstate3] = useState([]); // storing badges state
    const [state4, setstate4] = useState([]); // storing bookmarks state
    const [state5, setstate5] = useState([]); // storing tags state
    // const [tagstate,settagstate] = useState([]);
    const { userid } = useParams();
    useEffect(() => {
        async function getAnswers() {
            setstatus("Answers")

            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
                withCredentials: true
            }).then((r) => {
                setstate2(r.data)
            })
        }
        getAnswers();
    }, [userid])
    const showAnswers = async () => {
        setstatus("Answers")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
            withCredentials: true
        }).then((r) => {
            setstate2(r.data)
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
            setstate5(r.data)
        })
    }
    const showReputation = async () => {
        setstatus("Reputation")
    }
    const showBadges = async () => {
        setstatus("Badges")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/badges`, {
            withCredentials: true
        }).then((r) => {
            let gridProducts = [];
            for (let i = 0; i < r.data.length; i = i + 4) {
                gridProducts.push(r.data.slice(i, i + 4));
            }
            setstate3(gridProducts)
        })
    }
    const showBookmarks = async () => {
        setstatus("Bookmarks")

        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/bookmarks`, {
            withCredentials: true
        }).then((r) => {
            setstate4(r.data)
        })
    }

    return (
        <div>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <div style={{ display: "flex", flexDirection: "column", height: "12rem", justifyContent: "space-between", cursor: "pointer" }}>
                        <text style={status == "Answers" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showAnswers}>Answers</text>
                        <text style={status == "Questions" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showQuestions}>Questions</text>
                        <text style={status == "Tags" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showTags}>Tags</text>
                        <text style={status == "Badges" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showBadges}>Badges</text>
                        <text style={status == "Bookmarks" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showBookmarks}>Bookmarks</text>
                        <text style={status == "Reputation" ? { borderRadius: "5px", backgroundColor: "green", width: "5rem", color: "white" } : { border: "0" }} onClick={showReputation}>Reputation</text>
                    </div>
                </Col>
                <Col>

                    {
                        status === "Questions"  && <ItemList text={status} state={state} />
                    }
                    {
                        status === "Bookmarks" && <BookmarkList text={status} state={state4}/>
                    }
                    
                    {
                        status === "Answers" && <AnswerList text={status} state={state2} />
                    }
                    {
                        status === "Tags" && <TagList text={status} state={state5} />
                    }

                    {
                        status === "Badges" && <BadgeList text={status} state={state3} />
                    }
                    {
                        status === "Reputation" && <Reputation text={status} state={state} />
                    }



                </Col>
            </Row>
        </div>
    )
}

export default ActivitySubTab