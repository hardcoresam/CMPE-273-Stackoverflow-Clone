import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Modal } from 'react-bootstrap';
import SideMenu from '../Dashboard/DashboardCards/SideMenu';
import profpic from '../images/santhoshProfPic.jpg'
import ProfileSubTab from './ProfileSubTab'
import ActivitySubTab from './ActivitySubTab'
import Axios from 'axios'
import Constants from '../util/Constants.json'
import './styles.css'
// import Constants from "../util/Constants.json"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userReducer } from '../../features/UserSlice';
import emptyuserimage from '../images/emptyimage.png'
const User = () => {
  const obj = useSelector(state => state.UserSlice)
  const { username } = obj.value
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [tabflag, settabflag] = useState(true)
  const [modal, setmodal] = useState(false);
  const [profilepicture, setprofilepicture] = useState("")
  const [image, setImage] = useState({ preview: "", raw: "" })
  const [userProfile, setUserProfile] = useState({
    registered_on: "26/04/2022, 14:16:25",
    last_login_time: "26/04/2022, 14:16:25",
    id: 1,
    email: "sai@gmail.com",
    username: "saikrishna",
    password: "password",
    photo: null,
    about: "If you want me to buy a coffe",
    is_admin: false,
    reputation: 3,
    location: "hyderabad",
    gold_badges_count: 0,
    silver_badges_count: 1,
    bronze_badges_count: 0,
    Badges: [],
    answersCount: 1,
    questionsCount: 2,
    userReach: 0,
    bronzeBadges: [],
    silverBadges: [],
    goldBadges: []
  });

  useEffect(() => {
    // await Axios.get(`${Constants.uri}/api/users/profile/${userid}`,{
    //   withCredentials: true
    // }).then((r) => {
    //   const member = r.data;
    //   setUserProfile(prevState => {
    //     let userProfileForm = { ...prevState };
    //     userProfileForm.photo = member.photo;
    //     userProfileForm.username = member.username;
    //     userProfileForm.about = member.about;
    //     userProfileForm.is_admin = member.is_admin;
    //     userProfileForm.reputation = member.reputation;
    //     userProfileForm.location = member.location;
    //     userProfileForm.gold_badges_count = member.gold_badges_count;
    //     userProfileForm.silver_badges_count = member.silver_badges_count;
    //     userProfileForm.email = member.email;
    //     userProfileForm.bronze_badges_count = member.bronze_badges_count;
    //     userProfileForm.Badges = member.Badges;
    //     userProfileForm.answersCount = member.answersCount;
    //     userProfileForm.questionsCount = member.questionsCount;
    //     userProfileForm.userReach = member.userReach;
    //     userProfileForm.bronzeBadges = member.bronzeBadges;
    //     userProfileForm.silverBadges = member.silverBadges;
    //     userProfileForm.goldBadges = member.goldBadges;

    //     return userProfileForm;
    // });
    // })

    dispatch(userReducer(userProfile))
  })

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
    const result = await Axios.post(`${Constants.uri}/api/users/profile/${userid}/editProfile`, { withCredentials: true });
    if (result.status === 200) {
      setmodal(false)
    }
    else {

    }
  }
  return (
    <div>
      <Row>
        <Col sm={2}>

        </Col>
        <Col sm={8}>
          <Row style={{ marginTop: "28px", marginLeft: "-30px" }}>
            <Col sm={2}><img style={{ height: "8rem", borderRadius: "8px" }} src={profpic}></img></Col>
            <Col style={{ marginTop: "2rem", marginLeft: "1rem" }}>
              <Row>
                <text style={{ fontSize: "30px" }}>{userProfile.username}</text>
              </Row>
              <Row>
                <text><i class="fa-solid fa-cake-candles"></i>Member from {userProfile.registered_on} <i class="fa-solid fa-clock"></i> lastseen {userProfile.last_login_time}</text>
              </Row>
              <Row>
                <text><i class="fa-solid fa-location-pin"></i>{userProfile.location}</text>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col sm={1}><Button variant={tabflag ? "warning" : "light"} className='rounded-pill' onClick={profileSubTab}>Profile</Button></Col>
            <Col sm={1}></Col>
            <Col sm={1} style={{ marginLeft: "-2rem" }}><Button variant={!tabflag ? "warning" : "light"} className='rounded-pill' onClick={activitySubTab}>Activity</Button></Col>
          </Row>
          <Row>
            {tabflag ? <ProfileSubTab /> : <ActivitySubTab />}
          </Row>
        </Col>
        <Col sm={2}>
          <Button onClick={openeditProfile} style={{ marginTop: "28px", color: "Black", borderColor: "black" }} variant='outline-light'>Edit Profile</Button>
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

                  {profilepicture ? (
                    image.preview ? <img className='circleemptyimage' src={image.preview}  alt="dummy" /> :
                      <img className='circleemptyimage' src={profilepicture} alt="dummy" />
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
            <Col sm={6}><input onChange={(e) => setUserProfile.username(e.target.value)} value={userProfile.username} style={{ width: "12rem" }}></input></Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Col sm={4}>Location</Col>
            <Col sm={6}><input onChange={(e) => setUserProfile.location(e.target.value)} value={userProfile.location} style={{ width: "12rem" }}></input></Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Col sm={4}>About</Col>
            <Col sm={6}><input onChange={(e) => setUserProfile.about(e.target.value)} value={userProfile.about} style={{ width: "12rem" }}></input></Col>
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