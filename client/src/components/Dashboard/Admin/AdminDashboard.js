import React, { useState } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
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
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
              <Bar options={options} data={data} />
              </div>

            </Col>
            <Col sm={5}>
              <div>
              <Bar options={options} data={data} />
              </div>

            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={5}>
              <div>
              <Bar options={options} data={data} />
              </div>

            </Col>
            <Col sm={5}>
              <div>
              <Bar options={options} data={data} />
              </div>

            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={5}>
              <div>
              <Bar options={options} data={data} />
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