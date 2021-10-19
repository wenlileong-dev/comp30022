import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthFail from "./../components/AuthFail";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
// import { useHistory } from "react-router-dom";

function Account() {
  const [isAuth, setIsAuth] = useState(false);
  const [authFailMsg, setAuthFailMsg] = useState("");
  // let history = useHistory();

  const logoutUser = async () => {
    let result = await axios.post("api/user/logout");
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
  const [isVerify, setIsVerify] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    axios
      .get(`api/user/`)
      .then((response) => {
        // console.log(response.data);
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
          setIsVerify(response.data.user.verified);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const onEdit = () => {
    window.location.href = "/user/editInfo";
  };

  const handleVerify = async () => {
    const sendEmail = await axios.post("api/user/sendVerifyEmail", {});
    setEmailMessage(sendEmail.data.message);
  };

  return (
    <React.Fragment>
      {isAuth && (
        <>
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
                  id="outlined-read-only-input"
                  label="Email"
                  fullWidth
                  // defaultValue="123"
                  value={email}
                  InputProps={{
                    readOnly: true,
                    startAdornment: isVerify ? (
                      <InputAdornment position="start">
                        <Chip label="Verified" />
                      </InputAdornment>
                    ) : (
                      <></>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="FirstName"
                  fullWidth
                  // defaultValue="123"
                  value={firstName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="LastName"
                  fullWidth
                  // defaultValue="123"/
                  value={lastName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="PhoneNumber"
                  fullWidth
                  value={phoneNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  // defaultValue="123"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="primary"
                  onClick={onEdit}
                  style={{ marginLeft: "1vw " }}
                >
                  <Link to="/user/editInfo">Edit</Link>
                </Button>
                <Button
                  variant="primary"
                  onClick={logoutUser}
                  style={{ marginLeft: "2vw " }}
                  data-cy="logout-button"
                >
                  Logout
                </Button>
                {!isVerify && (
                  <Button
                    variant="primary"
                    onClick={handleVerify}
                    style={{ marginLeft: "2vw " }}
                  >
                    Verify Email
                  </Button>
                )}
              </Grid>
            </Grid>
            <p>{emailMessage}</p>
          </Box>
        </>
      )}
      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </React.Fragment>
  );
}

export default Account;
