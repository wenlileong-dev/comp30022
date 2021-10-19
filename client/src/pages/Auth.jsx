import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
// import { useHistory } from "react-router-dom";
// import { message } from "antd";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Auth() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [isRegisterAlert, setIsRegisterAlert] = useState(false);
  const [isLoginAlert, setIsLoginAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // let history = useHistory()
  const onLogin = async () => {
    let loginData = { email, password };
    let loginUser = await axios.post("api/user/login", loginData, {
      withCredentials: true,
    });
    // console.log(loginUser.data);
    if (!loginUser.data.success) {
      setIsLoginAlert(true);
      setAlertMessage(loginUser.data.error);
    } else {
      window.location.href = "/dashboard";
      // console.log(loginUser.data);
      // history.push({
      //   pathname: '/dashboard',
      //   state: { user: loginUser.data }
      // })
    }
  };

  const onRegister = async () => {
    let registerData = { firstName, lastName, email, password, phoneNumber };
    let registerUser = await axios.post("api/user/register", registerData);
    if (!registerUser.data.success) {
      setIsRegisterAlert(true);
      setAlertMessage(registerUser.data.error);
    } else {
      await axios
        .post(`api/group/default/${registerUser.data.user.userID}`)
        .then((res) => {});
      window.location.href = "/dashboard";
    }
  };

  // function DefaultGroup {
  //   await axios.post(`/group/default/${RegisterID}}`).then((res) => {
  //     console.log(RegisterID);
  //   });
  // }

  return (
    <div style={{ width: "40%", margin: "auto", marginTop: "20%" }}>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "2vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {isRegisterAlert && (
              <Alert severity="error" data-cy="register-error">
                {alertMessage}
              </Alert>
            )}
            <Form.Group controlId="formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="Enter first name"
                data-cy="register-firstName"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter last name"
                data-cy="register-lastName"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                data-cy="register-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                data-cy="register-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                password must have at least 8 characters, containing at least
                one alphabet character and one numerical digit
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPhonenumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="phonenumber"
                placeholder="Enter phone number"
                data-cy="register-phoneNumber"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onRegister}
            data-cy="register-button"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Welcome!</h1>
      <Form>
        {isLoginAlert && (
          <Alert severity="error" data-cy="login-error">
            {alertMessage}
          </Alert>
        )}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            data-cy="login-email"
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
            data-cy="login-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          style={{ marginTop: "2vw" }}
          onClick={handleShow}
          data-cy="go-register"
        >
          Register
        </Button>
        <Button
          variant="outline-primary"
          style={{ marginTop: "2vw", marginLeft: "1vw" }}
          onClick={onLogin}
          data-cy="login-button"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Auth;
