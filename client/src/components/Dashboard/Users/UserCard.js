import React, { useEffect, useState } from 'react'
import { Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap'
import pic1 from '../../images/santhoshProfPic.jpg'
import { useNavigate } from 'react-router'
import axios from 'axios'
import emptyuserimage from '../../images/emptyimage.png'
import Constants from '../../util/Constants.json'
const UserCard = () => {
  const navigate = useNavigate();
  // const testuser = 12345;
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function getTags() {
      const res = await axios.get(`${Constants.uri}/api/users`)
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
  const openuserProfile = (i) => {
    navigate(`/User/${i.id}`)
  }

  const onChangeUserInput = async (e) => {
    e.preventDefault()
    const res = await axios.get(`${Constants.uri}/api/users/filter/${e.target.value}`)
    const filteredUsers = res.data
    if (filteredUsers.length > 0) {
      console.log("here--")
      setUserGrid(filteredUsers)
    } else {
      const res = await axios.get(`${Constants.uri}/api/users`)
      setUserGrid(res.data)
    }
  }
  return (
    <div>
      <Row style={{ marginBottom: "3rem" }}>
        <Col sm={3}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
            <FormControl
              placeholder="Filter By User name"
              onChange={(e) => onChangeUserInput(e)}
            />
          </InputGroup>
        </Col>
        <Col sm={5}></Col>

      </Row>

      {
        users.map((x) => (
          <Row>
            {x.map((i) => (<Card style={{ border: "0", width: "16rem", marginBottom: "2rem" }}>
              <Row>
                <Col style={{ marginRight: "10px" }} sm={3}><img src={i.photo ? i.photo : emptyuserimage} style={{ width: "50px", height: "50px", borderRadius: "5px" }}></img></Col>
                <Col style={{ marginTop: "-10px" }}>
                  <Row><text onClick={(e) => openuserProfile(i)} style={{ cursor: "pointer", marginLeft: "-9px" }}>{i.username}</text></Row>
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