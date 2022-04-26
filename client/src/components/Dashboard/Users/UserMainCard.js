import React from 'react'
import UserCard from './UserCard'
import { Row } from 'react-bootstrap'
const UserMainCard = () => {
  const arr =[[1,2,3,4],[2,4,4,5]]
  return (
    <div>
{
  arr.map((x)=>(
    <Row>
    {x.map((i)=>(<UserCard />))}
    </Row>
   ))
}
    
    </div>
  )
}

export default UserMainCard