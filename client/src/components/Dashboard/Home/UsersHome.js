import React from 'react'
import { Col, Row, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import UsersTopCard from '../DashboardCards/UsersTopCard';
import UserMainCard from '../Users/UserMainCard';
const UsersHome = () => {
    const obj = useSelector(state => state.DashboardSecondTopSlice)
    const {flag,tagflag} = obj.value
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
                    
                </Col>
                <Col sm={10}>
                  <UsersTopCard />
                  <UserMainCard />                   
                </Col>
            </Row>

        </div>


    )
}

export default UsersHome