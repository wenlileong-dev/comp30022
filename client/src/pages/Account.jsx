import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import axios from '../commons/axios.js';
import axios from "axios";
import { Link } from "react-router-dom";
import AuthFail from "./../components/AuthFail";
// import { useHistory } from "react-router-dom";

function Account() {
  const [isAuth, setIsAuth] = useState(false);
  const [authFailMsg, setAuthFailMsg] = useState("");

  // let history = useHistory()
  const logoutUser = async () => {
    let result = await axios.post("/user/logout");
    if (result.data.status !== 200) {
      alert(result.data.errorMsg);
    } else {
      window.location.href = "/login";
    }
  };
  // const [form] = Form.useForm();

  // const [details, getDetails] = useState({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    getUserDetails();
    console.log(email);
  }, []);

  const getUserDetails = () => {
    axios
      .get(`/user/`)
      .then((response) => {
        console.log(response.data);
        if (!response.data.success) {
          setIsAuth(false);
          setAuthFailMsg(response.data.errorMsg);
          window.location.href = "/login";
        } else {
          setIsAuth(true);
          setEmail(response.data.user.email);
          setFirstName(response.data.user.firstName);
          setLastName(response.data.user.lastName);
          setPhoneNumber(response.data.user.phoneNumber);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const onEdit = () => {
    window.location.href = "/user/editInfo";
    // history.push({
    //   pathname: "/user/editInfo", state: {
    //     user: props
    //   }
    // })
  };
  return (
    <React.Fragment>
      {isAuth && (
        <>
          <p>Account Page</p>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                // defaultValue="123"
                value={email}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                // defaultValue="123"
                value={firstName}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                // defaultValue="123"/
                value={lastName}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                value={phoneNumber}
                // defaultValue="123"
              />
              <Button type="primary" onClick={onEdit}>
                <Link to="/user/editInfo">Edit</Link>
              </Button>
              <Button variant="primary" onClick={logoutUser}>
                Logout
              </Button>
            </div>
          </Box>
        </>
      )}

      {authFailMsg && <AuthFail msg={authFailMsg} />}
      {/* <div style={{width:'40%', margin:'auto'}}>
          <Form form={form} layout="vertical">
            <Form.Item label="Email">
              <Input placeholder="email" defaultValue={props.location.state.user.email}/>
            </Form.Item>      
            <Form.Item label="First Name">
              <Input placeholder="first name" defaultValue={props.location.state.user.firstName}/>
            </Form.Item>
            <Form.Item label="Last Name">
              <Input placeholder="last name" defaultValue={props.location.state.user.lastName}/>
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input placeholder="phone number" defaultValue={props.location.state.user.phoneNumber}/>
            </Form.Item>
            <Form.Item label="Password">
              <Input placeholder="password" defaultValue={props.location.state.user.password}/>
            </Form.Item>
            <Form.Item> */}
      {/* <Button type="primary" onClick={onEdit}>Edit</Button> */}
      {/* </Form.Item>
          </Form> */}

      {/* <Button variant="primary" onClick={logoutUser}>
        Logout
      </Button> */}
      {/* </div> */}
    </React.Fragment>
  );
}

export default Account;
