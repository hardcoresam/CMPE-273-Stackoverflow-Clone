import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const TagTopCard = () => {
  const obj = useSelector(state => state.DashboardSecondTopSlice)
  const { Title, Description } = obj.value
  return (
    <div >
      <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
        <Row>
          <Col sm={9}>
            <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>Tags</text>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={9}>
            <text>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question."</text>
          </Col>
          <Col>
          </Col>
        </Row>
      </div>

      <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
    </div>
  )
}

export default TagTopCard