import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const MainTopSecondCard = () => {
  const obj = useSelector(state => state.DashboardSecondTopSlice)
  const { Title, Description } = obj.value
  return (
    <div >
      <div style={{ marginTop: "1rem", marginLeft: "-15px" }}>
        <Row>
          <Col sm={9}>
            <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>{Title}</text>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col sm={9}>
            <text>{Description}</text>
          </Col>
          <Col>
          </Col>
        </Row>
      </div>

      <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
    </div>
  )
}

export default MainTopSecondCard