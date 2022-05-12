import React from 'react'
import { Col, Row, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import MainCard from '../DashboardCards/MainCard';
import MainTopCard from '../DashboardCards/MainTopCard';
import MainTopSecondCard from '../DashboardCards/MainTopSecondCard';
import SideMenu from '../DashboardCards/SideMenu';
import TagMainCard from '../Tags/TagMainCard';
import UserMainCard from '../Users/UserMainCard';
const Dashboard = () => {
    const obj = useSelector(state => state.DashboardSecondTopSlice)
    const { flag, tagflag } = obj.value
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
                <Col sm={7}>
                    <MainTopCard />
                    <MainCard />
                </Col>
                {
                    flag && <Col sm={3}>
                        <Card style={{ width: "17rem", height: "360px", backgroundColor: "hsl(47deg 65% 84%)" }}>
                            <Row>
                                <Col sm={2}></Col>
                                <Col style={{ color: "hsl(210deg 8% 45%)", fontWeight: "bold", fontSize: "15px" }}>The Overflow Blog</Col>
                            </Row>
                            <Row>
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}></Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}></Col>
                                <Col style={{ color: "hsl(210deg 8% 45%)", fontWeight: "bold", fontSize: "15px" }}>Hot Meta Posts</Col>
                            </Row>
                            <Row>
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}></Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}></Col>
                                <Col style={{ color: "hsl(210deg 8% 45%)", fontWeight: "bold", fontSize: "15px" }}>Featured on Meta</Col>
                            </Row>
                            <Row>
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}></Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                }

            </Row>

        </div>


    )
}

export default Dashboard