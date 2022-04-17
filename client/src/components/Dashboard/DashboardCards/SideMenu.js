import React from 'react'

const SideMenu = () => {
    const divStyle = {
        overflowY: 'scroll',
        border: '1px solid',
        width: '170px',
        float: 'left',
        height: '577px',
        position: 'fixed'
    };
    return (
        <div>
            <div style={divStyle}>
                <h6>Home</h6>
                <h6>Public</h6>
                <h6>Questions</h6>
                <h6>Tags</h6>
                <h6>Users</h6>
                <h6>Companies</h6>
            </div>
        </div>
    )
}

export default SideMenu