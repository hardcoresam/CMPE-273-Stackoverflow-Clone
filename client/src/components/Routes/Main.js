import React from 'react'
import { Routes, Route } from "react-router"
import AdminDashboard from '../Dashboard/Admin/AdminDashboard'
import Home from '../Dashboard/Home/Home'
import AskQuestion from '../Dashboard/Questions/AskQuestion'
import QuestionOverview from '../Dashboard/Questions/QuestionOverview'
import TagOverview from '../Dashboard/Tags/TagOverview'
import Login from '../Login/Login'
import NavBar from '../NavBar'
import Register from '../Register/Register'
import User from '../User/User'
const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NavBar />} >
                <Route path="/Dashboard" element= {<Home />} />
                <Route path="/User/:userid" element= {<User />} />
                <Route path = "/askQuestion" element = {<AskQuestion />} />
                <Route path = "/questions/:qid" element ={<QuestionOverview />} />
                <Route path = "/tags/:tid" element ={<TagOverview />} />
                </Route>
                <Route path="/AdminDashBoard" element= {<AdminDashboard />} />
            </Routes>
            
        </div>
    )
}

export default Main