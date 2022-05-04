import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router';
import Cookies from 'js-cookie'
const SideMenu = () => {
    const userid = Cookies.get("ID") 
    const dispatch = useDispatch();
    var navigate = useNavigate();
    const [sidetitle,setSidetitle] = useState("Home");
    const questionAction =()=>{
        setSidetitle("Home")
        navigate('/DashBoard')
    }
    const tagAction=()=>{
        setSidetitle("Tags")
        navigate('/DashBoard/Tags')
        
    }

    const userAction = () =>{
        setSidetitle("Users")
        navigate('/DashBoard/Users')
        
    }
    
    
    const divStyle = {
        overflowY: 'scroll',
        border: '1px solid',
        width: '170px',
        float: 'left',
        height: '577px',
        position: 'fixed',
    };
    return (
        <div>
            <div style={divStyle}>

                {
                // <h6 style={{cursor : "pointer"}} onClick={homeAction}>Home</h6>
                // <h6>Public</h6>
                }
                {
                    sidetitle === "Home" ? <h6 style={{cursor : "pointer",padding:"2px", marginLeft:"1rem", color:"white",marginTop:"1rem", backgroundColor:"#ff9900", width:"3rem", borderRadius:"6px"}} onClick={questionAction}>Home</h6> : <h6 style={{cursor : "pointer",padding:"2px", marginLeft:"1rem",color:"gray",marginTop:"1rem",  width:"3rem", borderRadius:"6px"}} onClick={questionAction}>Home</h6>
                }
                {
                    sidetitle === "Tags" ? <h6 style={{cursor : "pointer", padding:"2px", marginLeft:"2rem", color:"white",marginTop:"1rem", backgroundColor:"#ff9900", width:"45px", borderRadius:"6px"}} onClick={tagAction}>Tags</h6> : <h6 style={{cursor : "pointer", padding:"2px", marginLeft:"2rem", color:"gray",marginTop:"1rem", width:"45px", borderRadius:"6px"}} onClick={tagAction}>Tags</h6>
                }
                {
                    sidetitle === "Users" ? <h6 style={{cursor : "pointer", padding:"2px", marginLeft:"2rem", color:"white",marginTop:"1rem", backgroundColor:"#ff9900", width:"3rem", borderRadius:"6px"}} onClick = {userAction}>Users</h6> : <h6 style={{cursor : "pointer", padding:"2px", marginLeft:"2rem", color:"gray",marginTop:"1rem", width:"3rem", borderRadius:"6px"}} onClick = {userAction}>Users</h6>
                }
                
                </div>
        </div>
    )
}

export default SideMenu