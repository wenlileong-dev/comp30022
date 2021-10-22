import React, { useState, useEffect } from "react";
import { Form, Input, Divider, Typography, message } from "antd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function Account(props) {
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

  console.log(props.location);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userDetail = await axios("/api/user");

    if (!userDetail.data.success) {
      // alert(response.data.errorMsg);
      window.location.href = "/login";
    } else {
      setId(userDetail.data.user._id);
      setEmail(userDetail.data.user.email);
      setFirstName(userDetail.data.user.firstName);
      setLastName(userDetail.data.user.lastName);
      setPhoneNumber(userDetail.data.user.phoneNumber);
    }
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
  };

  const onSubmit = () => {
    if (password) {
      axios
        .post(`/api/user/update/${id}`, {
          firstName,
          lastName,
          password,
          phoneNumber,
        })
        .then((response) => {
          // console.log(password)
          if (response.data.success) {
            message.success("Account detail update successfully");
            window.location.href = "/user";
          } else {
            message.error(response.data.error);
          }
        });
    } else {
      axios
        .post(`/api/user/update/${id}`, {
          firstName,
          lastName,
          phoneNumber,
        })
        .then((response) => {
          // console.log(password)
          if (response.data.success) {
            message.success("Account detail update successfully");
            window.location.href = "/user";
          } else {
            message.error(response.data.error);
          }
        });
    }
  };
  return (
    <React.Fragment>
      <p style={{ marginLeft: "43vw " }}>Account Edit Page</p>
      <Box
        sx={{
          width: "117ch",
          height: "100ch",
          border: "1px solid rgb(221,225,230)",
          margin: "auto",
          "& .MuiTextField-root": { m: 4, width: "50ch" },
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="LastName"
            // defaultValue="123"/
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="PhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Divider style={{ marginLeft: "3vw " }}>
            Click{" "}
            <Link onClick={enablePassword} target="_blank">
              here
            </Link>{" "}
            to change password
          </Divider>
          <Divider style={{ marginLeft: "3vw " }} />
          {/* <p style={{ marginLeft: '2vw '}}>At least one alphabet character</p> */}
          {/* <p style={{ marginLeft: '2vw '}}>At least one numerical digit</p> */}
          {/* <p style={{ marginLeft: '2vw '}}>password must have at least 8 characters, containing at least one alphabet character and one numerical digit</p> */}
          <TextField
            required
            id="outlined-required"
            label="Password"
            defaultValue=""
            disabled={disable}
            onChange={(e) => setPassword(e.target.value)}
            // value={password}
          />
          {open && (
            <p style={{ marginLeft: "3vw " }}>
              password must have at least 8 characters, containing at least one
              alphabet character and one numerical digit
            </p>
          )}

          <div>
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
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
}

export default Account;
