import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { clickReducer } from '../../../features/DashboardTopSlice';
import { onclickReducer, onShowReducer } from '../../../features/DashboardSecondTopSlice';
import {Navigate, useNavigate} from 'react-router-dom'
const SideMenu = () => {
    const testuser = 12345;
    const dispatch = useDispatch();
    var navigate = useNavigate();
    const homeAction =()=>{
        navigate('/DashBoard')
        dispatch(clickReducer({
            Title : "Top Questions",
            questionCount : ""
        }))
        dispatch(onShowReducer({flag :true,tagflag : true}))
    }
    const questionAction =()=>{
        navigate('/DashBoard')
        dispatch(clickReducer({
            Title : "All Questions",
            questionCount : "22,469,947 questions"
        }))
        dispatch(onShowReducer({flag :true,tagflag : true}))
    }
    const tagAction=()=>{
        navigate('/DashBoard')
        dispatch(onclickReducer({
            Title : "Tags",
            Description : "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."
        }))
        dispatch(onShowReducer({flag :false,tagflag : true}))
    }

    const userAction = () =>{
        navigate('/DashBoard')
        dispatch(onclickReducer({
            Title : "Users",
            Description : ""
        }))
        dispatch(onShowReducer({flag :false, tagflag : false}))
    }
    const gotouser = () =>{
        
        navigate(`/User/${testuser}`)
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
                <h6 style={{cursor : "pointer"}} onClick={gotouser}>User Profile</h6>
            </div>
        </div>
    )
}

export default SideMenu