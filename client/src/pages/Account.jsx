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
  }, []);

  const getUserDetails = () => {
    axios
      .get(`/user/`)
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
          <p style={{ marginLeft: '43vw '}}>Account Page</p>
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
                id="outlined-read-only-input"
                label="Email"
                // defaultValue="123"
                value={email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="FirstName"
                // defaultValue="123"
                value={firstName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="LastName"
                // defaultValue="123"/
                value={lastName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="PhoneNumber"
                value={phoneNumber}
                InputProps={{
                  readOnly: true,
                }}
                // defaultValue="123"
              />
              
        
      <div>
              <Button type="primary" onClick={onEdit} style={{ marginLeft: '1vw '}}>
                <Link to="/user/editInfo">Edit</Link>
              </Button>
              <Button variant="primary" onClick={logoutUser} style={{ marginLeft: '2vw '}}>
                Logout
              </Button>
              </div>
            </div>
          </Box>

        </>
      )}
      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </React.Fragment>
  );
}

export default Account;
