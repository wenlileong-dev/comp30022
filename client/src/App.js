import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { message } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from './commons/axios.js';

import Navigation from "./pages/Home/Navigation";

function App(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  let history = useHistory()

  const onLogin = () => {
    axios.post('/user/login', {email: email, password: password}).then(response => {
      // successfully matching the registered account, return to the dashboard page with user information
      if (response.data.success) {
        history.push({
          pathname: "/user", state: {
            user: response.data.user,
          }
        })
      } else { 
        setShow(false);
        message.error(response.data.error)
      }
    }).catch(error =>{
      setShow(false);
      console.log(error);
    })
  }

  const onRegister = () => {
    history.push({
      pathname: "/user/register"
    })
  }

  return (
    <div style={{ width: '40%', margin: 'auto', marginTop: '20%' }}>
      <Modal show={show} onHide={handleClose} style={{ marginTop: '2vh'}}>
        <Modal.Header closeButton>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId = "formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control type = "firstname" placeholder = "Enter first name"
                onChange = {e => setFirstname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId = "formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control type = "lastname" placeholder = "Enter last name"
                onChange = {e => setLastname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId = 'formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type = "email" placeholder="Enter email"
                onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId = "formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type = "password" placeholder = "Enter password"
                onChange = {e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId = "formBasicPhonenumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type = "phonenumber" placeholder = "Enter phone number"
                onChange = {e => setPhonenumber(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick = {handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick = {onRegister}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Welcome!</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" style={{ marginTop: '2vw'}} onClick={handleShow}>Register</Button>
        <Button variant="outline-primary" style={{ marginTop: '2vw', marginLeft: '1vw'}} onClick={onLogin}>Login</Button>
      </Form>
    </div>
  );
}

export default App;



<React.Fragment>
<Router>
  <Navigation />
</Router>
</React.Fragment>