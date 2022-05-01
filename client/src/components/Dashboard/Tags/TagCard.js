import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import './Styles.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Constants from './../../util/Constants.json'

const TagCard = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState([])

  useEffect(() => {
    async function getTags() {
      const res = await axios.get(`${Constants.uri}/api/tags`)
      setTagsGrid(res.data)
    }
    getTags()
  },[])

  const setTagsGrid = (data) => {
    console.log('setting grid')
    const tagsGrid = []
    for (var i = 0; i < data.length; i = i + 3) {
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
      tagsGrid.push(ar)
    }
    setTags(tagsGrid)
  }

  const onChangeTagInput = async (e) => {
    e.preventDefault()
    const res = await axios.get(`${Constants.uri}/api/tags/${e.target.value}`)
    const filteredtags = res.data
    console.log(filteredtags.length)
    if(filteredtags.length > 0){
      console.log("here--")
      setTagsGrid(filteredtags)
    }
  }

  const openTag = (tag) => {
   navigate(`/tags/${tag.name}/?show_user_posts=${false}&filterBy=${false}`);
  }
  return (
    <div>

      <div style={{width:'20%'}}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
          <FormControl
            placeholder="Filter By tag name"
            onChange={(e)=>onChangeTagInput(e)}
          />
        </InputGroup>
      </div>



      {tags && tags.map((tagRow) => (
        <Row>
          {tagRow && tagRow.map(tag => (
            <Col sm={3}>
              <Card style={{ width: "16rem" }}>
                <Card.Body>
                  <Row><Button className='tagButton' style={{ width: "auto", paddingLeft: 2, backgroundColor:"109, 158, 207", paddingRight: 3, paddingTop: 1, paddingBottom: 1, borderRadius: "5px" }} onClick={()=>openTag(tag)}>{tag.name}</Button></Row>
                  <Row style={{ marginTop: "1rem" }}><text>{tag.description}</text></Row>
                  <Row style={{ marginTop: "1rem" }}>
                    {/* <Col sm={5}>dwddsafasffwefefef</Col>
                  <Col sm={2}></Col>
                  <Col>vanaavdm</Col> */}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <br />
        </Row>

      ))}

    </div>
  )
}

export default TagCard