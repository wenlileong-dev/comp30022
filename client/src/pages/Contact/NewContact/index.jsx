import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import AuthFail from "../../../components/AuthFail";
import axios from "axios";

import AddFooter from "../../../components/AddFooter";
import GroupSelector from "../../../components/Group/GroupSelector";
import "./index.css";

export default class NewContact extends Component {
  state = {
    isAuth: false,
    authFailMsg: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    department: "",
    address: "",
    remark: "",
    groupID: "",
  };

  // Save contact information
  saveFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  };

  saveLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };

  saveGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  savePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  saveEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  saveDepartment = (e) => {
    this.setState({ department: e.target.value });
  };

  saveAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  saveRemark = (e) => {
    this.setState({ remark: e.target.value });
  };

  handleGroup = (groupID) => {
    this.setState({ groupID });
  };

  componentDidMount() {
    axios("/api/contacts/add-contact", {
      method: "GET",
    }).then(
      (response) => {
        if (response.data.status === 200) {
          this.setState({ isAuth: true });
          console.log("auth succ", response);
        } else {
          this.setState({ isAuth: false, authFailMsg: response.data.errorMsg });
          console.log("auth fail", response);
          window.location.href = "/login";
        }
      },
      (error) => {
        this.setState({ isAuth: false });
      }
    );
  }

  render() {
    // console.log("render", this.state.isAuth);
    // console.log("groupID = ", this.state.groupID);
    const { isAuth, authFailMsg } = this.state;
    return (
      <Fragment>
        {isAuth && (
          <>
            {/* <h2 className='newContact'>New Contact</h2> */}
            <Typography
              className="newContact"
              variant="h4"
              gutterBottom
              component="div"
            >
              New Contact
            </Typography>
            <Box
              // component="form"
              sx={{
                width: "117ch",
                height: "110ch",
                border: "1px solid rgb(221,225,230)",
                margin: "auto",
                "& .MuiTextField-root": { m: 4, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                label="First Name Required"
                variant="filled"
                onChange={this.saveFirstName}
              />

              <TextField
                required
                label="Last Name Required"
                variant="filled"
                onChange={this.saveLastName}
              />

              <FormControl className="contactSelector" component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  onChange={this.saveGender}
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <br />
              <TextField
                required
                label="Phone Number Required"
                variant="filled"
                onChange={this.savePhone}
              />

              {/* <br/> */}
              <TextField
                required
                label="Email Address Required"
                variant="filled"
                onChange={this.saveEmail}
              />

              <br />
              <TextField
                label="Department (Optional)"
                variant="filled"
                onChange={this.saveDepartment}
              />

              <br />
              <TextField
                label="Address (Optional)"
                variant="filled"
                onChange={this.saveAddress}
              />

              <br />
              <TextField
                label="Remark (Optional)"
                variant="filled"
                onChange={this.saveRemark}
              />

              <GroupSelector
                handleGroup={this.handleGroup}
                isEdit={true}
                isNew={true}
              />
              <br />
              <br />
              <AddFooter {...this.state} />
            </Box>
          </>
        )}

        {authFailMsg && <AuthFail msg={authFailMsg} />}
      </Fragment>
    );
  }
}
