import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'
const Search = () => {
    var description = "swdasd"
    const [searchParams] = useSearchParams();
    const searchString = searchParams.get("searchString");
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getQuestionforTags() {
            const res1 = await axios.post(`${Constants.uri}/api/post/search?searchString=${searchString}`,{withCredentials:true});
            console.log(res1)
            // setQuestions(res1.data.Posts)
        }
        getQuestionforTags();
    }, [])


    return (
        <div>
            


        </div>
    )
}

export default Search