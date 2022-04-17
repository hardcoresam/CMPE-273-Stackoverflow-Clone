import React from 'react'
import { useDispatch } from "react-redux";
import { clickReducer } from '../../../features/DashboardTopSlice';
const SideMenu = () => {
    const dispatch = useDispatch();



    const homeAction =()=>{
        dispatch(clickReducer({
            Title : "Top Questions",
            questionCount : ""
        }))
    }
    const questionAction =()=>{
        dispatch(clickReducer({
            Title : "All Questions",
            questionCount : "22,469,947 questions"
        }))
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
                <h6 style={{cursor : "pointer"}}>Tags</h6>
                <h6 style={{cursor : "pointer"}}>Users</h6>
                <h6>Companies</h6>
            </div>
        </div>
    )
}

export default SideMenu