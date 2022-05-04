import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { clickReducer } from '../../../features/DashboardTopSlice';
import { onclickReducer, onShowReducer } from '../../../features/DashboardSecondTopSlice';
import {Navigate, useNavigate} from 'react-router-dom'
const SideMenu = () => {
    const testuser = 12345;
    const dispatch = useDispatch();
    var navigate = useNavigate();
    
    const questionAction =()=>{
        navigate('/DashBoard')
    }
    const tagAction=()=>{
        navigate('/DashBoard/Tags')
        
    }

    const userAction = () =>{
        navigate('/DashBoard/Users')
        
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

                {
                // <h6 style={{cursor : "pointer"}} onClick={homeAction}>Home</h6>
                // <h6>Public</h6>
                }
                <h6 style={{cursor : "pointer", marginLeft:"1rem", color:"gray"}} onClick={questionAction}>Home</h6>
                <h6 style={{cursor : "pointer", marginLeft:"1rem", color:"gray"}} onClick={tagAction}>Tags</h6>
                <h6 style={{cursor : "pointer", marginLeft:"1rem", color:"gray"}} onClick = {userAction}>Users</h6>
                <h6 style={{cursor : "pointer", marginLeft:"1rem", color:"gray"}} onClick={gotouser}>User Profile</h6>
            </div>
        </div>
    )
}

export default SideMenu