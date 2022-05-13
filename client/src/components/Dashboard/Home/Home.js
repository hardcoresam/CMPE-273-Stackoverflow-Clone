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
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}>
                                    <Row>
                                        <Col sm={1}></Col>
                                        <Col style={{ fontSize: "13px", marginTop: "1rem" }} sm={10}>Software is adopted, not sold (Ep. 441)</Col>
                                        <Col sm={1}></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={1}></Col>
                                        <Col style={{ fontSize: "13px", marginTop: "1rem" }} sm={10}>An unfiltered look back at April Fools’ 2022</Col>
                                        <Col sm={1}></Col>
                                    </Row>
                                </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}></Col>
                                <Col style={{ color: "hsl(210deg 8% 45%)", fontWeight: "bold", fontSize: "15px" }}>Hot Meta Posts</Col>
                            </Row>

                            <Row>
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}>

                                    <Row>
                                        <Col sm={1}></Col>
                                        <Col style={{ fontSize: "13px", marginTop: "1rem" }} sm={10}>
                                        Should we burninate the [write] tag?</Col>
                                        <Col sm={1}></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={1}></Col>
                                        <Col style={{ fontSize: "13px", marginTop: "1rem" }} sm={10}>
                                        Staging Ground: Reviewer Motivation, Scaling, and Open Questions</Col>
                                        <Col sm={1}></Col>
                                    </Row>

                                </Card>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={2}></Col>
                                <Col style={{ color: "hsl(210deg 8% 45%)", fontWeight: "bold", fontSize: "15px" }}>Featured on Meta</Col>
                            </Row>
                            <Row>
                                <Col><Card style={{ width: "17rem", height: "6rem", backgroundColor: "hsl(47deg 83% 91%)" }}>
                                <Row>
                                        <Col sm={1}></Col>
                                        <Col style={{ fontSize: "13px", marginTop: "25px" }} sm={10}>
                                        Overhauling our community's closure reasons and guidance</Col>
                                        <Col sm={1}></Col>
                                    </Row>
                                </Card>
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