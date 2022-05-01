import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
const BadgeList = (props) => {
  const arr = [[1, 2,3], [3, 4,5]]
  const [state,setstate] = useState([]);
  useEffect(()=>{
    let gridProducts =[];
      for(let i=0;i<props.state.length;i=i+4){
        gridProducts.push(props.state.slice(i,i+4));
      }
      setstate(gridProducts)
  },[])
  return (
    <div>
      <Row>
        <h5>{props.state.length} {props.text}</h5>
      </Row>
      {
        state.map((array) => (
          <Row>
            {array.map((obj) => (

              <Card style={{ width: "8rem" , marginRight:"3rem", marginBottom:"1rem"}}>
              <Row>
              <Col><text style={{color:"gold"}}><i class="fa-solid fa-circle" style={{fontSize:"10px"}}></i></text></Col>
              <Col><text>{obj.name}</text>
              </Col>
              
              </Row>
             
              </Card>
            ))}
          </Row>
        ))
      }
    </div>
  )
}

export default BadgeList