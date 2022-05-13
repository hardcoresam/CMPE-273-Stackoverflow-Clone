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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logoutPending, logoutSuccess } from '../../../features/logout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const AdminDashboard = () => {

  const dispatch = useDispatch();
  var navigate = useNavigate();

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

  var labels = []
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

  const [tagForm, setTagForm] = useState({
    name: "", description: ""
  })

  const { name, description } = tagForm

  const onChangeTagData = (e) => {
    e.preventDefault()
    setTagForm({ ...tagForm, [e.target.name]: e.target.value })
  }

  const addTag = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true
    const res = await axios.post(`${Constants.uri}/api/admin/new-tag`, tagForm,
      {
        validateStatus: status => status < 500
      })


    if (res.status === 200) {
      setmodal(false)
      toast.success(`Created new tag, ${name}`, { position: "top-center" })
    } else {
      if (res.data.message.error) {
        toast.error(`${res.data.message.error}`, { position: "top-center" });
      } else {
        toast.error('Server Error', { position: "top-center" })
      }

    }
  }

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

  const [isAdmin, setIsAdmin] = useState(false)

  const [pendingApprovals, setPendingApprovals] = useState([])

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

    async function getPendingApprovalQuestions() {
      const res = await axios.get(`${Constants.uri}/api/admin/pending-approval`, { withCredentials: true })
      setPendingApprovals(res.data)
    }

    let admin
    async function getAdmin() {
      const userid = Cookies.get("ID")
      admin = await axios.get(`${Constants.uri}/api/users/${userid}/profile`)
      setIsAdmin(admin.data.is_admin)
      if (admin.data.is_admin) {
        adminstats()
        getPendingApprovalQuestions()
      }
      else {
        toast.error('You are not authorised to this page', { position: 'top-center' })
      }
    }

    getAdmin()

  }, [])

  const approveQuestion = async (id, approve) => {
    const res = await axios.post(`${Constants.uri}/api/admin/approve`, { id, approve }, { withCredentials: true })
    if (res && approve) {
      toast.success('Aprroved the question')
      window.location.reload()
    }
    if (res && !approve) {
      toast.success("Question Rejected, Status: closed")
      window.location.reload()
    }
  }

  const logout = () => {
    dispatch(logoutPending())
    Cookies.remove('access-token')
    dispatch(logoutSuccess())
    Cookies.remove('ID')
    navigate("/Dashboard")
  }

  return (

    <div style={{ margin: "1rem", backgroundColor: "#e6e6e6", width: "78rem", height: "78rem" }}>
      {isAdmin && (
        <>
          <Row style={{ margin: "1rem" }}>
            <Col sm={3}></Col>
            <Col style={{ marginTop: "2rem" }}><h1>ADMIN DASHBOARD</h1></Col>
            <Row>
              <Col sm={7}><Button onClick={openDashboard} style={{ border: "0" }} className='btn btn-secondary rounded-pill'>Dashboard</Button></Col>
              <Col ><Button onClick={openTagModal} className='btn btn-secondary rounded-pill'>Create Tag</Button></Col>
              <Col style={{ marginLeft: "-9rem" }}><Button onClick={openpendings} className='btn btn-secondary rounded-pill'>Pending Approvals</Button></Col>
              <Col sm={1} style={{ marginLeft: "-9rem" }}><Button onClick={logout} className='btn btn-secondary rounded-pill'>Logout</Button></Col>
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
                <br />
                <Row style={{ marginLeft: '20%', marginRight: "20%" }}>
                  <Col>
                    <h4 style={{ textAlign: 'center' }}>Pending Approvals</h4>
                    <br />
                    {pendingApprovals ? (
                      <>
                        {pendingApprovals.map(pending => (
                          <>
                            <Row>
                              <Col sm={6}><Link to={`/questions/${pending.id}`} style={{ textDecoration: 'none' }}>{pending.title}</Link></Col>
                              <Col sm={4}>Posted {moment(pending.created_date).fromNow()}</Col>
                              <Col sm={2}><Button className='btn btn-success rounded-pill' onClick={() => approveQuestion(pending.id, true)}>Approve</Button></Col>
                            </Row>
                            <hr />
                          </>
                        ))}
                      </>
                    ) :
                      (
                        <h6>No questions for Approvals</h6>
                      )}
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
                <Col sm={6}><input name="name" value={name} onChange={(e) => onChangeTagData(e)}></input></Col>
              </Row>
              <Row>
                <Col sm={4}>Tag Description</Col>
                <Col sm={6}><textarea style={{ width: "15rem", height: "15rem" }} name="description" value={description} onChange={(e) => onChangeTagData(e)}></textarea></Col>
              </Row>
              <Row>
                <Col sm={10}></Col>
                <Col><Button style={{ backgroundColor: "#008000" }} onClick={(e) => addTag(e)}>Create</Button></Col>
              </Row>
            </Modal.Body>
          </Modal>
        </>
      )}

    </div>
  )
}

export default AdminDashboard