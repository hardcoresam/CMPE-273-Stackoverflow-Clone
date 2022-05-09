import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import Constants from './../../util/Constants.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const AdminDashboard = () => {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: [20, 10],
      },
    ],
  };


  const [modal, setmodal] = useState(false);
  const [dashboardflag, setdashboardflag] = useState(true);

  const openTagModal = () => {
    setmodal(true);
  }

  const openDashboard = () => {
    setdashboardflag(true);
  }

  const openpendings = () => {
    setdashboardflag(false)
  }

  const [noOfQuestionsPerDay, setNoOfQuestionsPerDay] = useState({})
  const [optionsNoOfQuestionsPerDay, setOptionsNoOfQuestionsPerDay] = useState({})

  const [topTenViewedQuestions, setTopTenViewedQuestions] = useState({})
  const [optionsTopTenViewedQuestions, setOptionsTopTenViewedQuestions] = useState({})

  const [topTenTags, setTopTenTags] = useState({})
  const [optionsTopTenTags, setOptionsTopTenTags] = useState({})

  const [topTenUsers, setTopTenUsers] = useState({})
  const [optionsTopTenUsers, setOptionsTopTenUsers] = useState({})

  const [leastTenUsers, setLeastTenUsers] = useState({})
  const [optionsLeastTenUsers, setOptionsLeastTenUsers] = useState({})


  useEffect(() => {
    async function adminstats() {
      const res = await axios.get(`${Constants.uri}/api/admin/stats`, { withCredentials: true })
      console.log(res)
      const { data } = res

      //-------------------------------No of questions per day------------------------------------------------
      var ln = []
      var dn = []
      var datan = {}
      for (var i = 0; i < data.noOfQuestionsPerDay.length; i++) {
        ln.push(data.noOfQuestionsPerDay[i].post_created_date)
        dn.push(data.noOfQuestionsPerDay[i].posts_count)
      }
      datan = {
        labels: ln,
        datasets: [
          {
            label: 'Questions Count',
            backgroundColor: '#2992e3',
            data: dn,
          },
        ]
      }
      setNoOfQuestionsPerDay(datan)
      setOptionsNoOfQuestionsPerDay({
        ...options, plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'No of Questions asked per day',
          },
        },
      })

      //--------------------------------------------Top ten viewed questions----------------------------------------
      var ln = []
      var dn = []
      var datan = {}
      for (var i = 0; i < data.topTenViewedQuestions.length; i++) {
        ln.push(data.topTenViewedQuestions[i].id)
        dn.push(data.topTenViewedQuestions[i].views_count)
      }
      datan = {
        labels: ln,
        datasets: [
          {
            label: 'Question Count',
            backgroundColor: '#32a852',
            data: dn,
          },
        ]
      }
      setTopTenViewedQuestions(datan)
      setOptionsTopTenViewedQuestions({
        ...options, plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top 10 most viewed Questions',
          },
        },
      })

      //--------------------------------------------Top ten Tags----------------------------------------
      var ln = []
      var dn = []
      var datan = {}
      for (var i = 0; i < data.topTenTags.length; i++) {
        ln.push(data.topTenTags[i].name)
        dn.push(data.topTenTags[i].no_of_questions)
      }
      datan = {
        labels: ln,
        datasets: [
          {
            label: 'Number of questions',
            backgroundColor: '#a84432',
            data: dn,
          },
        ]
      }
      setTopTenTags(datan)
      setOptionsTopTenTags({
        ...options, plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top 10 tags with most questions asked',
          },
        },
      })


      //--------------------------------------------Top ten users----------------------------------------
      var ln = []
      var dn = []
      var datan = {}
      for (var i = 0; i < data.topTenUsers.length; i++) {
        ln.push(data.topTenUsers[i].username)
        dn.push(data.topTenUsers[i].reputation)
      }
      datan = {
        labels: ln,
        datasets: [
          {
            label: 'Reputation Score',
            backgroundColor: '#e3dd29',
            data: dn,
          },
        ]
      }
      setTopTenUsers(datan)
      setOptionsTopTenUsers({
        ...options, plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top 10 Users with most Reputation',
          },
        },
      })

      //--------------------------------------------Least 10 users----------------------------------------
      var ln = []
      var dn = []
      var datan = {}
      for (var i = 0; i < data.leastTenUsers.length; i++) {
        ln.push(data.leastTenUsers[i].username)
        dn.push(data.leastTenUsers[i].reputation)
      }
      datan = {
        labels: ln,
        datasets: [
          {
            label: 'Reputation score',
            backgroundColor: '#29e3d3',
            data: dn,
          },
        ]
      }
      setLeastTenUsers(datan)
      setOptionsLeastTenUsers({
        ...options, plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Least 10 Users with least Reputation',
          },
        },
      })


    }
    adminstats()
  }, [])

  return (
    <div style={{ margin: "1rem", backgroundColor: "#e6e6e6", width: "78rem", height: "78rem" }}>
      <Row style={{ margin: "1rem" }}>
        <Col sm={3}></Col>
        <Col style={{ marginTop: "2rem" }}><h1>Welcome to Admin Dashboard!!!</h1></Col>
        <Row>
          <Col sm={8}><Button onClick={openDashboard} style={{ backgroundColor: "#00ff99", color: "black", border: "0" }}>Dashboard</Button></Col>
          <Col ><Button onClick={openTagModal} style={{ backgroundColor: "#00ff99", color: "black", border: "0" }}>Add Tag here</Button></Col>
          <Col style={{ marginLeft: "-9rem" }}><Button onClick={openpendings} style={{ backgroundColor: "#00ff99", color: "black", border: "0" }}>Pending Approvals</Button></Col>
        </Row>
      </Row>
      {
        dashboardflag ? <div>
          <Row>
            <Col sm={5}></Col>
            <Col>
              <h4>Dashboard</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={5}>
              <div>
                {noOfQuestionsPerDay && noOfQuestionsPerDay.datasets && noOfQuestionsPerDay.datasets[0].data && (
                  <Bar options={optionsNoOfQuestionsPerDay} data={noOfQuestionsPerDay} />
                )}

              </div>

            </Col>
            <Col sm={5}>
              <div>
                {topTenViewedQuestions && topTenViewedQuestions.datasets && topTenViewedQuestions.datasets[0].data && (
                  <Bar options={optionsTopTenViewedQuestions} data={topTenViewedQuestions} />
                )}
              </div>

            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={1}></Col>
            <Col sm={5}>
              <div>
                {topTenTags && topTenTags.datasets && topTenTags.datasets[0].data && (
                  <Bar options={optionsTopTenTags} data={topTenTags} />
                )}
              </div>

            </Col>
            <Col sm={5}>
              <div>
                {topTenUsers && topTenUsers.datasets && topTenUsers.datasets[0].data && (
                  <Bar options={optionsTopTenUsers} data={topTenUsers} />
                )}
              </div>

            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={5}>
              <div>
                {leastTenUsers && leastTenUsers.datasets && leastTenUsers.datasets[0].data && (
                  <Bar options={optionsLeastTenUsers} data={leastTenUsers} />
                )}
              </div>

            </Col>

          </Row>

        </div> :
          <div>
            <Row>
              <Col sm={5}></Col>
              <Col>
                <h4>Pendings</h4>
              </Col>
            </Row>
          </div>
      }




      <Modal show={modal} size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered onHide={() => setmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginBottom: "2rem" }}>
            <Col sm={4}>Tag Name</Col>
            <Col sm={6}><input></input></Col>
          </Row>
          <Row>
            <Col sm={4}>Tag Description</Col>
            <Col sm={6}><textarea style={{ width: "12rem" }}></textarea></Col>
          </Row>
          <Row>
            <Col sm={10}></Col>
            <Col><Button style={{ backgroundColor: "#008000" }}>Add</Button></Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminDashboard