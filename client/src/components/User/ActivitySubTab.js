import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const ActivitySubTab = () => {
    return (
        <div>
            <Row style={{ marginTop: "1rem" }}>
                <Col sm={3}>
                    <div style={{ display: "flex", flexDirection: "column", height: "12rem", justifyContent: "space-between", cursor: "pointer" }}>
                        <text>Answers</text>
                        <text>Questions</text>
                        <text>Tags</text>
                        <text>Articles</text>
                        <text>Badges</text>
                        <text>Bookmarks</text>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ActivitySubTab