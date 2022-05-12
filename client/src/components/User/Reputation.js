import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Accordion } from 'react-bootstrap'
import Constants from '../util/Constants.json'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router'
import moment from 'moment'
const Reputation = (props) => {
  const location = useLocation();
  const { userid } = useParams();
  const [history, setHistory] = useState([]);
  const [flag, setFlag] = useState(true);
  const arr = [1, 2, 3, 4, 5];
  const history1 = [
    {
      date: "11/05/2022",
      totalReputation: 25,
      history: [
        {
          postId: 23934,
          postTitle: "ghjkmlffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            },
            {
              type: "DOWNVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        },
        {
          postId: 23933,
          postTitle: "What's up San joseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee?",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        },
        {
          postId: 23933,
          postTitle: "What's up San jose?",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        }

      ]
    },
    {
      date: "10/05/2022",
      totalReputation: 10,
      history: [
        {
          postId: 23934,
          postTitle: "ghjkml",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        }
      ]
    }
  ]
  useEffect(() => {
    async function getReputationhistory() {
      const res = await axios.get(`${Constants.uri}/api/users/${userid}/activity/reputation`, { withCredentials: true });
      setHistory(res.data);
      console.log(res);
    }
    getReputationhistory();
  }, [location])

  const opendropdown = () => {
    // setFlag(!flag)
  }
  return (
    <div>
      <Row>
        <h5>{props.text}</h5>
      </Row>
      <Accordion defaultActiveKey="0" >
        {
          history1.map((i, key) => (
            <Accordion.Item eventKey={key}>
              <Accordion.Header>
                <Row>
                  <Col sm={4} style={{ color: "hsl(140deg 40% 47%)" }}>{i.totalReputation > 0 ? (<text>+{i.totalReputation}</text>) : (<text>-{i.totalReputation}</text>)}</Col>
                  <Col >{moment(i.date).format("MMM Do")}</Col>
                </Row>
              </Accordion.Header>
              <Accordion.Body>
                {
                  i.history.map((hist) => (
                    hist.postHistoryGrouping.length == 1 ?
                      <Row>
                        <Col>{hist.postHistoryGrouping[0].type}</Col>
                        <Col>{hist.postHistoryGrouping[0].score}</Col>
                        <Col>{hist.postTitle}</Col>
                      </Row>
                      :
                      <Accordion.Item eventKey={key}>
                        <Accordion.Header>
                          <Row>
                            <Col>{hist.postHistoryGrouping.length} events</Col>
                            <Col>{hist.postHistoryGroupingScore}</Col>
                            <Col>{hist.postTitle}</Col>
                          </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                          {hist.postHistoryGrouping.map((obj) => (
                            <Row>
                              <Col>{obj.type}</Col>
                              <Col>{obj.score}</Col>

                            </Row>
                          ))}

                        </Accordion.Body>
                      </Accordion.Item>


                  ))
                }
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>




    </div>
  )
}

export default Reputation