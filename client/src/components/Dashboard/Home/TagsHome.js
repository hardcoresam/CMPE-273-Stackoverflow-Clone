import React from 'react'
import { Col, Row, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import MainCard from '../DashboardCards/MainCard';
import MainTopCard from '../DashboardCards/MainTopCard';
import MainTopSecondCard from '../DashboardCards/MainTopSecondCard';
import SideMenu from '../DashboardCards/SideMenu';
import TagTopCard from '../DashboardCards/TagTopCard';
import TagMainCard from '../Tags/TagMainCard';
import UserMainCard from '../Users/UserMainCard';
const TagsHome = () => {
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
                  <TagTopCard />
                  <TagMainCard />                   
                </Col>
                
                
            </Row>

        </div>


    )
}

export default TagsHome