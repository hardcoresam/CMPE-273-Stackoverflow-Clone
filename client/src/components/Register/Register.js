import React from "react";
import { Card, Row, Col, Modal, Button, Image } from "react-bootstrap";
import { Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import Constants from "../util/Constants.json";
import { useNavigate } from "react-router";
import logo from "./../images/stackoverflow_logo.png";

const Register = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    if (password.length < 3) return false;
    if (password.length > 8) return false;
    return true;
  };

  const validate = () => {
    if (!email) return false;
    if (!password) return false;
    if (!displayName) return false;
    return true;
  };
  const registerUser = async () => {
    if (validate()) {
      validatePassword(password);
      if (validateEmail(email)) {
        if (validatePassword(password)) {
          await Axios.post(
            `${Constants.uri}/api/users/register`,
            {
              email: email,
              displayName: displayName,
              password: password,
            },
            {
              validateStatus: (status) => status < 500,
            }
          )
            .then((r) => {
              if (r.status === 200) {
                //   dispatch(registerSuccess())
                props.setregistermodal(false);
                navigate("/DashBoard");
              } else {
                console.log(r);
                setErrors(`${r.data.message.error}`);
                //  dispatch(registerFail(r.data.message.error))
              }
            })
            .catch((err) => {
              //   dispatch(registerFail(err.data.message.msg))
            });
        } else {
          setErrors("Password length must be minimum of 3 and maximum of 8.");
        }
      } else {
        setErrors("Enter a valid Email");
      }
    } else {
      setErrors("Please Enter all the fields");
    }
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="signmodalbody">
        <Image
          className="center"
          style={{ marginLeft: "40%", marginRight: "50%" }}
          src={logo}
          width={45}
          height={45}
        />
        {errors && <Alert variant="danger">{errors}</Alert>}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "15rem",
          }}
        >
          <Row style={{ marginTop: "-5px" }}>
            <label for="Email">Display name</label>
          </Row>
          <Row style={{ margin: "1px" }}>
            <input
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              id="Email"
            ></input>
          </Row>

          <Row style={{ marginTop: "-5px" }}>
            <label for="Email">Email</label>
          </Row>
          <Row style={{ margin: "1px" }}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="Email"
            ></input>
          </Row>

          <Row>
            <label for="Password">Password</label>
          </Row>
          <Row style={{ margin: "1px" }}>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="Second Name"
            ></input>
          </Row>

          <Row style={{ margin: "1px", marginTop: "7px" }}>
            <Button onClick={registerUser} className="signinButton">
              Sign up
            </Button>
          </Row>
        </div>

        {
          //isLoading && <Spinner variant="primary" animation="border"/>
        }
      </Modal.Body>
    </Modal>
  );
};

export default Register;
