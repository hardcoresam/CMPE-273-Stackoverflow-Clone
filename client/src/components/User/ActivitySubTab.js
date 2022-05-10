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
import { statusReducer } from '../../features/UserActivitySlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const ActivitySubTab = () => {
    const dispatch  = useDispatch();
    const obj = useSelector(state =>state.UserActivitySlice)
    const {status} = obj.value;
    // const [status, setstatus] = useState("Answers")
    const [state, setstate] = useState([]); //storing questions state
    const [state2, setstate2] = useState([]); // storing answers state 
    const [state3, setstate3] = useState([]); // storing badges state
    const [state4, setstate4] = useState([]); // storing bookmarks state
    const [state5, setstate5] = useState([]); // storing tags state
    const [state6, setstate6] = useState([]); // storing tags reputation
    // const [tagstate,settagstate] = useState([]);
    const { userid } = useParams();
    useEffect(() => {
        async function getAnswers() {
            // dispatch(statusReducer("Answers"))

            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
                withCredentials: true
            }).then((r) => {
                setstate2(r.data)
            })
        }
        getAnswers();
    }, [userid])

    const showAnswers = async () => {
        dispatch(statusReducer("Answers"))
        await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
            withCredentials: true
        }).then((r) => {
            console.log(r.data)
            setstate2(r.data)
        })
    }
    const showQuestions = async () => {
        dispatch(statusReducer("Questions"))
    }
    const showTags = async () => {
        dispatch(statusReducer("Tags"))
    }
    const showReputation = async () => {
        dispatch(statusReducer("Reputation"))
    }
    const showBadges = async () => {
        dispatch(statusReducer("Badges"))
    }

    
    const showBookmarks = async () => {
        dispatch(statusReducer("Bookmarks"))
        // await Axios.get(`${Constants.uri}/api/users/${userid}/activity/bookmarks`, {
        //     withCredentials: true
        // }).then((r) => {
        //     setstate4(r.data)
        // })
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
                        status === "Questions"  && <ItemList text={status} />
                    }
                    {
                        status === "Bookmarks" && <BookmarkList text={status} />
                    }
                    
                    {
                        status === "Answers" && <AnswerList text={status} state={state2} />
                    }
                    {
                        status === "Tags" && <TagList text={status} />
                    }

                    {
                        status === "Badges" && <BadgeList text={status} />
                    }
                    {
                        status === "Reputation" && <Reputation text={status} state={state6} />
                    }



                </Col>
            </Row>
        </div>
    )
}

export default ActivitySubTab