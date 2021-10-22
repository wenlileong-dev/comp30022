import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
                    required
                    label="First Name Required"
                    variant="filled"
                    fullWidth
                    onChange={this.saveFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Last Name Required"
                    variant="filled"
                    fullWidth
                    onChange={this.saveLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className="contactSelector" component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      onChange={this.saveGender}
                      row
                      aria-label="gender"
                      fullWidth
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Phone Number Required"
                    variant="filled"
                    fullWidth
                    onChange={this.savePhone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Email Address Required"
                    variant="filled"
                    fullWidth
                    onChange={this.saveEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department (Optional)"
                    variant="filled"
                    fullWidth
                    onChange={this.saveDepartment}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address (Optional)"
                    variant="filled"
                    fullWidth
                    onChange={this.saveAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Remark (Optional)"
                    variant="filled"
                    fullWidth
                    onChange={this.saveRemark}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <GroupSelector
                    handleGroup={this.handleGroup}
                    isEdit={true}
                    isNew={true}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <AddFooter {...this.state} />
                </Grid>
                
              </Grid>
            </Box>
          </>
        )}

        {authFailMsg && <AuthFail msg={authFailMsg} />}
      </Fragment>
    );
  }
}
