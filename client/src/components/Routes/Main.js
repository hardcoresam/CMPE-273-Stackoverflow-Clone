import React from 'react'
import { Routes, Route } from "react-router"
import Home from '../Dashboard/Home/Home'
import NavBar from '../NavBar'
const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NavBar />} >
                <Route path="/Dashboard" element= {<Home />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Main