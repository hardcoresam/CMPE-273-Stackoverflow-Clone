import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Modal } from 'react-bootstrap';
import SideMenu from '../Dashboard/DashboardCards/SideMenu';
import profpic from '../images/santhoshProfPic.jpg'
import ProfileSubTab from './ProfileSubTab'
import ActivitySubTab from './ActivitySubTab'
import Axios from 'axios'
import Constants from '../util/Constants.json'
import './styles.css'
import moment from 'moment';
import save from '../util/Util.js'
// import Constants from "../util/Constants.json"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userReducer } from '../../features/UserSlice';
import emptyuserimage from '../images/emptyimage.png'
import Cookies from 'js-cookie';
const User = () => {
  const obj = useSelector(state => state.UserSlice)
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [tabflag, settabflag] = useState(true)
  const [modal, setmodal] = useState(false);
  const [profilepicture, setprofilepicture] = useState("")
  const [image, setImage] = useState({ preview: "", raw: "" })
  const [uname,setuname] = useState("")
  const [loc,setloc] = useState("")
  const [about,setabout] = useState("")



  const [userProfile, setUserProfile] = useState({});
  var imguser;
  useEffect(() => {
    async function getUserInfo(){
      await Axios.get(`${Constants.uri}/api/users/${userid}/profile`,{
        withCredentials: true
      }).then((r) => {
        dispatch(userReducer(r.data))
      })
    }
    getUserInfo();

  },[userid,modal])
 

  const handleChange = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]))
    if (e.target.files.length) {
      // console.log(e.target.files.value);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }

  }

  const profileSubTab = () => {
    settabflag(true)
  }

  const activitySubTab = () => {
    settabflag(false)
  }

  const openeditProfile = () => {
    setmodal(true)

  }

  const editDetails = async () => {
    if(image.preview){
      imguser = await save(image.preview ,image.raw)
      setprofilepicture(imguser)
    }
  //  console.log("user "+ imguser)
    const result = await Axios.post(`${Constants.uri}/api/users/${userid}/editProfile`,{
      about : about ? about : obj.value.about,
      photo :  imguser ? imguser : obj.value.photo,
      location  : loc ? loc : obj.value.location,
      username : uname ? uname : obj.value.username
    },
    { withCredentials: true });
    if (result.status === 200) {
      setmodal(false)
    }
  }
  return (
    <div>
      <Row>
        <Col sm={2}>

        </Col>
        <Col sm={8}>
          <Row style={{ marginTop: "28px", marginLeft: "-30px" }}>
            <Col sm={2}><img style={{ height: "8rem",width:"9rem", borderRadius: "8px" }} src={obj.value.photo}></img></Col>
            <Col style={{ marginTop: "2rem", marginLeft: "1rem" }}>
              <Row>
                <text style={{ fontSize: "30px", fontFamily:"sans-serif" }}>{obj.value.username}</text>
              </Row>
              <Row>
                <text style={{color:"hsl(210deg 8% 45%)"}}><i style={{marginRight:"10px"}} class="fa-solid fa-cake-candles"></i>Member for {moment(obj.value.registered_on).fromNow(true)} <i style={{marginLeft:"10px"}} class="fa-solid fa-clock"></i> Last seen {moment(obj.value.last_login_time).fromNow()}</text>
              </Row>
              <Row>
                <text style={{color:"hsl(210deg 8% 45%)"}}><i class="fa-solid fa-location-pin"></i> {obj.value.location}</text>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col sm={1}><Button variant={tabflag ? "warning" : "light"} className='rounded-pill' onClick={profileSubTab}>Profile</Button></Col>
            <Col sm={1}></Col>
            <Col sm={1} style={{ marginLeft: "-2rem" }}><Button variant={!tabflag ? "warning" : "light"} className='rounded-pill' onClick={activitySubTab}>Activity</Button></Col>
          </Row>
          <Row>
            {tabflag ? <ProfileSubTab userid={userid} settabflag ={settabflag}/> : <ActivitySubTab />}
          </Row>
        </Col>
        <Col sm={2}>
        {
          Cookies.get("ID")===userid && <Button onClick={openeditProfile} style={{ marginTop: "28px", color: "Black", borderColor: "black" }} variant='outline-light'>Edit Profile</Button>
        
        }
        </Col>
      </Row>
      <Modal show={modal} size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered onHide={() => setmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ margin: 20 }}>
            <Col sm={4}>
              <div>
                <text>Profile Picture</text>

              </div>
            </Col>
            <Col sm={3}><input
              type="file"
              id="upload-button"
              onChange={handleChange}
            />
              <div>


              </div>
            </Col>
            <Row>
              <Col sm={2}></Col>
              <Col>
                <label htmlFor="upload-button">

                  {obj.value.photo ? (
                      <img className='circleemptyimage' src={obj.value.photo} alt="dummy" />
                  ) : (
                    image.preview ? <img className='circleemptyimage' src={image.preview}  alt="dummy" /> :
                      <div>
                        <img className='circleemptyimage' src={emptyuserimage}></img>
                      </div>
                  )}
                </label>
              </Col>
            </Row>
          </Row>

          <Row style={{ margin: 20 }}>
            <Col sm={4}>Username</Col>
            <Col sm={6}><input disabled={true} onChange={(e) => setuname(e.target.value)} defaultValue={obj.value.username} style={{ width: "12rem" }}></input></Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Col sm={4}>Location</Col>
            <Col sm={6}><input onChange={(e) => setloc(e.target.value)} defaultValue={obj.value.location} style={{ width: "12rem" }}></input></Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Col sm={4}>About</Col>
            <Col sm={6}><textarea onChange={(e) => setabout(e.target.value)} defaultValue={obj.value.about} style={{ width: "12rem" }}></textarea></Col>
          </Row>
          <Row>
            <Col sm={8}></Col>
            <Col><Button onClick={editDetails} style={{ backgroundColor: "#008000" }}>Save changes</Button></Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default User