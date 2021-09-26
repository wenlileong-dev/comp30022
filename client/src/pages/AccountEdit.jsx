import React, { useState ,useEffect} from 'react';
import { Button, Form, Input, Divider, Typography, message } from 'antd';
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
          setPassword(response.data.user.password);
          setPhoneNumber(response.data.user.phoneNumber);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };


  const enablePassword = () =>{
    if(disable){ setDisable(false) }
    else{ setDisable(true)}
  }

  const onSubmit = () =>{
    axios.post('/user/update/'+id,{
      firstName,
      lastName,
      password,
      phoneNumber
    }).then(response => {
      console.log(firstName)
      if(response.data.success){
        message.success("Account detail update successfully")
        window.location.href = "/user";
      }else{
        message.error(response.data.error)
      }
    })
  }
  return (
    <React.Fragment>
      <p>Account Edit Page</p>
      <div style={{width:'40%', margin:'auto'}}>
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
            <p>At least one alphabet character</p>
            <p>At least one numerical digit</p>
            <p>A length of at least 8 characters</p>
            <Input placeholder="enter your new password" type="password" DefaultValue="" disabled={disable} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Account;
