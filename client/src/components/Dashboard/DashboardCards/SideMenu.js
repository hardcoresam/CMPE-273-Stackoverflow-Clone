import React from 'react'
import { useDispatch } from "react-redux";
import { clickReducer } from '../../../features/DashboardTopSlice';
import { onclickReducer, onShowReducer } from '../../../features/DashboardSecondTopSlice';
const SideMenu = () => {
    const dispatch = useDispatch();
    const homeAction =()=>{
        dispatch(clickReducer({
            Title : "Top Questions",
            questionCount : ""
        }))
        dispatch(onShowReducer(true))
    }
    const questionAction =()=>{
        dispatch(clickReducer({
            Title : "All Questions",
            questionCount : "22,469,947 questions"
        }))
        dispatch(onShowReducer(true))
    }
    const tagAction=()=>{
        dispatch(onclickReducer({
            Title : "Tags",
            Description : "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."
        }))
        dispatch(onShowReducer(false))
    }

    const userAction = () =>{
        dispatch(onclickReducer({
            Title : "Users",
            Description : ""
        }))
        dispatch(onShowReducer(false))
    }
    const divStyle = {
        overflowY: 'scroll',
        border: '1px solid',
        width: '170px',
        float: 'left',
        height: '577px',
        position: 'fixed'
    };
    return (
        <div>
            <div style={divStyle}>
                <h6 style={{cursor : "pointer"}} onClick={homeAction}>Home</h6>
                <h6>Public</h6>
                <h6 style={{cursor : "pointer"}} onClick={questionAction}>Questions</h6>
                <h6 style={{cursor : "pointer"}} onClick={tagAction}>Tags</h6>
                <h6 style={{cursor : "pointer"}} onClick = {userAction}>Users</h6>
                <h6>Companies</h6>
            </div>
        </div>
    )
}

export default SideMenu