import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import MainCard from '../DashboardCards/MainCard';
import MainTopCard from '../DashboardCards/MainTopCard';
import MainTopSecondCard from '../DashboardCards/MainTopSecondCard';
import SideMenu from '../DashboardCards/SideMenu';

const Dashboard = () => {
    const obj = useSelector(state => state.DashboardSecondTopSlice)
    const {flag} = obj.value


    const divStyle = {
        overflowY: 'scroll',
        border: '1px solid',
        width: '170px',
        float: 'left',
        height: '577px',
        position: 'static'
    };
    return (
        <div>
            <Row>
                <Col sm={2}>
                    <SideMenu />
                </Col>
                <Col sm={7}>
                  {flag ? <MainTopCard /> : <MainTopSecondCard />}
                    <MainCard />
                </Col>
                <Col sm={2}>
                <h1>RightSide</h1>
                </Col>
            </Row>

        </div>


    )
}

export default Dashboard