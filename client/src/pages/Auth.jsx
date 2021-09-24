import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
// import { useHistory } from "react-router-dom";
// import { message } from "antd";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function Auth() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [isRegisterAlert, setIsRegisterAlert] = useState(false);
  const [isLoginAlert, setIsLoginAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onLogin = async () => {
    let loginData = { email, password };
    let loginUser = await axios.post("/user/login", loginData, {
      withCredentials: true,
    });
    console.log(loginUser.data);
    if (!loginUser.data.success) {
      setIsLoginAlert(true);
      setAlertMessage(loginUser.data.error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const onRegister = async () => {
    let registerData = { firstname, lastname, email, password, phonenumber };
    let registerUser = await axios.post("/user/register", registerData);
    if (!registerUser.data.success) {
      setIsRegisterAlert(true);
      setAlertMessage(registerUser.data.error);
    } else {
      window.location.href = "/dashboard";
    }
    console.log(registerUser.data);
  };

  return (
    <div style={{ width: "40%", margin: "auto", marginTop: "20%" }}>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "2vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {isRegisterAlert && <Alert severity="error">{alertMessage}</Alert>}
            <Form.Group controlId="formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="Enter first name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhonenumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="phonenumber"
                placeholder="Enter phone number"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onRegister}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Welcome!</h1>
      <Form>
        {isLoginAlert && <Alert severity="error">{alertMessage}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          style={{ marginTop: "2vw" }}
          onClick={handleShow}
        >
          Register
        </Button>
        <Button
          variant="outline-primary"
          style={{ marginTop: "2vw", marginLeft: "1vw" }}
          onClick={onLogin}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Auth;