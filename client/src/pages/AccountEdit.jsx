import React, { useState ,useEffect} from 'react';
import {  Form, Input, Divider, Typography, message } from 'antd';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import axios from '../commons/axios.js';
import axios from "axios";

function Account() {
  const [form] = Form.useForm();
  const {Link}=Typography;
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getUserDetails();
    console.log(email)
  }, []);

  const getUserDetails = () => {
    axios
      .get(`/user/`)
      .then((response) => {
        console.log(response.data)
        if (!response.data.success) {
          alert(response.data.errorMsg);
          window.location.href = "/login";
        } else {
          setId(response.data.user._id)
          setEmail(response.data.user.email);
          setFirstName(response.data.user.firstName);
          setLastName(response.data.user.lastName);
          // setPassword(response.data.user.password);
          setPhoneNumber(response.data.user.phoneNumber);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };



  const enablePassword = () =>{
    if(disable){ setDisable(false) }
    else{ setDisable(true)}
    if(!open){setOpen(true)}
    else{setOpen(false)}
  }
  const onBack = () => {
    window.location.href = "/user";
    // history.push({
    //   pathname: "/user/editInfo", state: {
    //     user: props
    //   }
    // })
  };

  const onSubmit = () =>{
    if(password){
      axios.post('/user/update/'+id,{
      firstName,
      lastName,
      password,
      phoneNumber
    }).then(response => {
      console.log(password)
      if(response.data.success){
        message.success("Account detail update successfully")
        window.location.href = "/user";
      }else{
        message.error(response.data.error)
      }
    })
  }else{
    axios.post('/user/update/'+id,{
      firstName,
      lastName,
      phoneNumber
    }).then(response => {
      console.log(password)
      if(response.data.success){
        message.success("Account detail update successfully")
        window.location.href = "/user";
      }else{
        message.error(response.data.error)
      }
    })
    }
    // axios.post('/user/update/'+id,{
    //   firstName,
    //   lastName,
    //   password,
    //   phoneNumber
    // }).then(response => {
    //   console.log(password)
    //   if(response.data.success){
    //     message.success("Account detail update successfully")
    //     window.location.href = "/user";
    //   }else{
    //     message.error(response.data.error)
    //   }
    // })
  }
  return (
    <React.Fragment>
      <p>Account Edit Page</p>
      {/* <div style={{width:'40%', margin:'auto'}}>
        <Form form={form} layout="vertical">
          <Form.Item label="Email (You can not change your email address)">
            <Input placeholder="email" value={email} disabled={true} />
          </Form.Item>      
          <Form.Item label="First Name">
            <Input placeholder="first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input placeholder="phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </Form.Item>
          <Divider>Click <Link onClick={enablePassword} target="_blank">here</Link> to change password</Divider>
          <Form.Item label="Change Password">
            <p disabled={disable}>At least one alphabet character</p>
            <p disabled={disable}>At least one numerical digit</p>
            <p disabled={disable}>A length of at least 8 characters</p>
            <Input placeholder="enter your new password" type="password" DefaultValue="" disabled={disable} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      </div> */}
      <Box 
                    sx={{
                        width: '117ch',
                        height: '100ch',
                        border: '1px solid rgb(221,225,230)',
                        margin: 'auto',
                        '& .MuiTextField-root': { m: 4, width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
            <div>
              <TextField
                disabled
                id="outlined-required"
                label="Email"
                // defaultValue="123"
                value={email}
              />
              <TextField
                required
                id="outlined-required"
                label="FirstName"
                // defaultValue="123"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="LastName"
                // defaultValue="123"/
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="PhoneNumber"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <Divider style={{ marginLeft: '3vw '}}>Click <Link onClick={enablePassword} target="_blank">here</Link> to change password</Divider>
              <Divider style={{ marginLeft: '3vw '}}/>
              {/* <p style={{ marginLeft: '2vw '}}>At least one alphabet character</p> */}
              {/* <p style={{ marginLeft: '2vw '}}>At least one numerical digit</p> */}
              {/* <p style={{ marginLeft: '2vw '}}>password must have at least 8 characters, containing at least one alphabet character and one numerical digit</p> */}
              <TextField
                required
                id="outlined-required"
                label="Password"
                defaultValue=""
                disabled={disable}
                onChange={e => setPassword(e.target.value)}
                // value={password}
              />
              {open && <p style={{ marginLeft: '3vw '}} >password must have at least 8 characters, containing at least one alphabet character and one numerical digit</p>}
              
        
      <div>
              <Button type="primary" onClick={onBack} style={{ marginLeft: '2vw '}}>
                <Link to="/user">Back</Link>
              </Button>
              <Button variant="primary" onClick={onSubmit} style={{ marginLeft: '2vw '}}>
                Submit
              </Button>
              </div>
            </div>
          </Box>
    </React.Fragment>
  );
}

export default Account;
