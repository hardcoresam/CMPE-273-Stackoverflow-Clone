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
                    sidetitle === "Home" ? <h6 style={{cursor : "pointer",paddingLeft:"1rem",padding:"2px",width:"10rem",  color:"black",fontWeight:"bold",marginTop:"1rem", backgroundColor:"hsl(210deg 8% 95%)",  borderRadius:"6px"}} onClick={questionAction}>Home</h6> : <h6 style={{cursor : "pointer",paddingLeft:"1rem",padding:"2px",color:"#525960",marginTop:"1rem",  width:"3rem", borderRadius:"6px"}} onClick={questionAction}>Home</h6>
                }
                {
                    sidetitle === "Tags" ? <h6 style={{cursor : "pointer", padding:"2px",  color:"black",fontWeight:"bold",marginTop:"1rem",paddingLeft:"2rem", backgroundColor:"hsl(210deg 8% 95%)", width:"10rem", borderRadius:"6px"}} onClick={tagAction}>Tags</h6> : <h6 style={{cursor : "pointer", padding:"2px",  color:"#525960",marginTop:"1rem",paddingLeft:"2rem", width:"45px", borderRadius:"6px"}} onClick={tagAction}>Tags</h6>
                }
                {
                    sidetitle === "Users" ? <h6 style={{cursor : "pointer", padding:"2px",  color:"black",fontWeight:"bold",marginTop:"1rem",paddingLeft:"2rem", backgroundColor:"hsl(210deg 8% 95%)", width:"10rem", borderRadius:"6px"}} onClick = {userAction}>Users</h6> : <h6 style={{cursor : "pointer", padding:"2px",  color:"#525960",marginTop:"1rem",paddingLeft:"2rem", width:"3rem", borderRadius:"6px"}} onClick = {userAction}>Users</h6>
                }
                
                </div>
        </div>
    )
}

export default SideMenu