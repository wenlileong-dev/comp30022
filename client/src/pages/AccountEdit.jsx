import React, { useState, useEffect } from "react";
import { Form, Input, Divider, Typography, message } from "antd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import axios from '../commons/axios.js';
import axios from "axios";

function Account() {
  const [form] = Form.useForm();
  const { Link } = Typography;
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
    console.log(email);
  }, []);

  const getUserDetails = () => {
    axios
      .get(`/user/`)
      .then((response) => {
        console.log(response.data);
        if (!response.data.success) {
          alert(response.data.errorMsg);
          window.location.href = "/login";
        } else {
          setId(response.data.user._id);
          setEmail(response.data.user.email);
          setFirstName(response.data.user.firstName);
          setLastName(response.data.user.lastName);
          // setPassword(response.data.user.password);
          setPhoneNumber(response.data.user.phoneNumber);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const enablePassword = () => {
    if (disable) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const onBack = () => {
    window.location.href = "/user";
    // history.push({
    //   pathname: "/user/editInfo", state: {
    //     user: props
    //   }
    // })
  };

  const onSubmit = () => {
    if (password) {
      axios
        .post("/user/update/" + id, {
          firstName,
          lastName,
          password,
          phoneNumber,
        })
        .then((response) => {
          console.log(password);
          if (response.data.success) {
            message.success("Account detail update successfully");
            window.location.href = "/user";
          } else {
            message.error(response.data.error);
          }
        });
    } else {
      axios
        .post("/user/update/" + id, {
          firstName,
          lastName,
          phoneNumber,
        })
        .then((response) => {
          console.log(password);
          if (response.data.success) {
            message.success("Account detail update successfully");
            window.location.href = "/user";
          } else {
            message.error(response.data.error);
          }
        });
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
  };
  return (
    <React.Fragment>
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
          width: "80%",
          border: "1px solid rgb(221,225,230)",
          margin: "auto",
          padding: "3rem",
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              id="outlined-required"
              label="Email"
              fullWidth
              // defaultValue="123"
              value={email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            <TextField
              required
              id="outlined-required"
              label="FirstName"
              fullWidth
              // defaultValue="123"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-required"
              label="LastName"
              fullWidth
              // defaultValue="123"/
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-required"
              label="PhoneNumber"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginLeft: "3vw " }}>
              Click{" "}
              <Link onClick={enablePassword} target="_blank">
                here
              </Link>{" "}
              to change password
            </Divider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Divider style={{ marginLeft: "3vw " }} />

            {open && (
              <>
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  fullWidth
                  defaultValue=""
                  // disabled={disable}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="password must have at least 8 characters, containing at least
                one alphabet character and one numerical digit"
                  // value={password}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="primary"
              onClick={onBack}
              style={{ marginLeft: "2vw " }}
            >
              <Link to="/user">Back</Link>
            </Button>
            <Button
              variant="primary"
              onClick={onSubmit}
              style={{ marginLeft: "2vw " }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Account;
