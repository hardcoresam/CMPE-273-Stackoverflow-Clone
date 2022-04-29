import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './styles.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import img1 from '../../images/santhoshProfPic.jpg'
const QuestionOverview = () => {
  const arr = [1, 2, 3, 4, 5]
  return (
    <div>
      <Row>
        <Col sm={2}></Col>
        <Col sm={9}>
          <Row><text style={{ fontSize: "2rem" }}>How to manage firebase users while creating a firebase user after logging into anotherfirebase user [duplicate]</text></Row>
          <Row style={{ marginLeft: "1px" }}>Asked 10 years, 10 months ago
            Modified 4 years, 3 months ago Viewed 126k times</Row>
          <hr style={{ marginTop: "1rem", marginLeft: "-45px" }}></hr>
          <Row>
            <Col sm={1}>
              <div className='uptriangle'></div>
              <div>20</div>
              <div className='downtriangle'></div>
              <div style={{ margin: "8px", cursor: "pointer" }}><i className="fa-solid fa-bookmark" style={{ color: "#c2d6d6" }}></i></div>
              <div style={{ margin: "8px", cursor: "pointer" }}><i class="fa-solid fa-clock" style={{ color: "#c2d6d6" }}></i></div>
            </Col>
            <Col>
              <Card style={{ width: "40rem", height: "auto", backgroundColor: "#e7f4f4" }}>
                <text> // the JSON data may store several data types, not just key value lists,
                  // but, must be able to identify some data as a key value list

                  // -- more "common" way to store a key value array

                  [

                  // another THOUSANDS KEY VALUE PAIRS
                  // ...
                  ],
                  "otherdata" :
                </text>
              </Card>
              <Row>
                <Col sm={3}>tag1tag2tag3</Col>
                <Col></Col>
                <Col sm={3}>
                  <Card style={{ backgroundColor: "#b3f0ff" }}>
                    <Card.Title>Asked on { }</Card.Title>
                    <Row>
                      <Col sm={3}><img style={{ width: "2rem", height: "2rem" }} src={img1}></img></Col>
                      <Col>
                        <Row><text>santhosh bodla</text></Row>
                        <Row>
                          <Col sm={5}>4321</Col>
                          <Col>g1 s3 b3</Col>
                        </Row>
                      </Col>
                    </Row>

                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ marginTop: "5rem" }}>
        <text style={{ marginLeft: "15rem" }}>4 answers</text>
        {
          arr.map((i) => (
            <Row >
              <Col sm={2}></Col>
              <Col sm={9}>

                <Row style={{ marginTop: "1rem" }}>
                  <Col sm={1}>
                    <div className='uptriangle'></div>
                    <div>20</div>
                    <div className='downtriangle'></div>
                    <div style={{ margin: "8px", cursor: "pointer" }}><i className="fa-solid fa-bookmark" style={{ color: "#c2d6d6" }}></i></div>
                    <div style={{ margin: "8px", cursor: "pointer" }}><i class="fa-solid fa-clock" style={{ color: "#c2d6d6" }}></i></div>
                  </Col>
                  <Col>
                    <text>So why don't you simply use a key-value literal?</text>
                    <Card style={{ width: "40rem", height: "auto", backgroundColor: " #e6e6e6" }}>
                      <text> // the JSON data may store several data types, not just key value lists,
                        // but, must be able to identify some data as a key value list

                        // -- more "common" way to store a key value array

                        [

                        // another THOUSANDS KEY VALUE PAIRS
                        // ...
                        ],
                        "otherdata" :
                      </text>
                    </Card>
                    <Row>
                      <Col sm={3}></Col>
                      <Col></Col>
                      <Col sm={3}>
                        <Card>
                          <Card.Title>Asked on { }</Card.Title>
                          <Row>
                            <Col sm={3}><img style={{ width: "2rem", height: "2rem" }} src={img1}></img></Col>
                            <Col>
                              <Row><text>santhosh bodla</text></Row>
                              <Row>
                                <Col sm={5}>4321</Col>
                                <Col>g1 s3 b3</Col>
                              </Row>
                            </Col>
                          </Row>

                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        }

      </div>
      <Row>
        <Col sm={3}></Col>
        <Col>
          <Row>Your Answer</Row>

          <textarea rows="6" cols="80">

          </textarea>

          <Row>
            <Col sm={3}><Button>Post Your Answer</Button></Col>

          </Row>

        </Col>
      </Row>
    </div>
  )
}

export default QuestionOverview