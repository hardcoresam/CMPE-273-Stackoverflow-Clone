import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import pic1 from '../../images/santhoshProfPic.jpg'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Constants from '../../util/Constants.json'
const UserCard = () => {
    const navigate = useNavigate();
    const testuser = 12345;
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function getTags() {
            const res = await axios.get(`${Constants.uri}/api/users`)
            console.log("///////")
            console.log(res)
            setUserGrid(res.data)
        }
        getTags()
    }, [])

    const setUserGrid = (data) => {
        console.log('setting grid')
        const tagsGrid = []
        for (var i = 0; i < data.length; i = i + 4) {
          var ar = []
          if (data[i]) {
            ar.push(data[i])
          }
          if (data[i + 1]) {
            ar.push(data[i + 1])
          }
          if (data[i + 2]) {
            ar.push(data[i + 2])
          }
          if (data[i + 3]) {
            ar.push(data[i + 3])
          }
          tagsGrid.push(ar)
        }
        console.log(tagsGrid)
        setUsers(tagsGrid)
      }
    const openuserProfile = () => {
        navigate(`/User/${testuser}`)
    }

    const onChangeUserInput = async (e) => {
        e.preventDefault()
        const res = await axios.get(`${Constants.uri}/api/users/${e.target.value}`)
        const filteredtags = res.data
        console.log(filteredtags.length)
        if (filteredtags.length > 0) {
          console.log("here--")
          setUserGrid(filteredtags)
        }
      }
    return (
        <div>
            <Row style={{ marginBottom: "3rem" }}>
                <Col sm={3}><input onChange={(e)=>onChangeUserInput(e)} placeholder='Filter by user'></input></Col>
                <Col sm={5}></Col>

            </Row>

            {
                users.map((x) => (
                    <Row>
                        {x.map((i) => (<Card style={{ border: "0", width: "16rem", marginBottom: "2rem" }}>
                            <Row>
                                <Col style={{ marginRight: "10px" }} sm={3}><img src={i.photo} style={{ width: "50px", height: "50px", borderRadius: "5px" }}></img></Col>
                                <Col style={{ marginTop: "-10px" }}>
                                    <Row><text onClick={openuserProfile} style={{ cursor: "pointer", marginLeft: "-9px" }}>{i.username}</text></Row>
                                    <Row style={{ marginTop: "-5px" }}>{i.location}</Row>
                                    <Row style={{ marginTop: "-5px" }}>{i.reputation}</Row>
                                </Col>
                            </Row>
                        </Card>))}
                    </Row>
                ))
            }

        </div>


    )
}

export default UserCard