import React, { Component, Fragment } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PubSub from "pubsub-js";
import AuthFail from "../../../components/AuthFail";
import EditFooter from "../../../components/EditFooter";
import GroupSelector from "../../../components/Group/GroupSelector";

export default class ContactInfo extends Component {
  state = {
    isAuth: false,
    authFailMsg: "",
    isFound: false,
    isEdit: false,
    contact: {
      //...this.props.location.state.contact
    },
    cancel: true,
  };

  updateFirstName = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      firstName: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateLastName = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      lastName: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateGender = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      gender: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updatePhone = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      phone: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateEmail = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      email: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateDepartment = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      department: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateAddress = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      address: e.target.value,
    });
    this.setState({ contact: contact });
  };

  updateRemark = (e) => {
    const contact = Object.assign({}, this.state.contact, {
      remark: e.target.value,
    });
    this.setState({ contact: contact });
  };

  handleEdit = (isEdit) => {
    this.setState({ isEdit });
    // console.log(isEdit);
  };

  handleCancel = () => {
    const contact = this.props.location.state.contact;
    this.setState({ contact });
    PubSub.publish("groupID", { groupID: contact.groupID });
  };

  handleGroup = (groupID) => {
    const contact = Object.assign({}, this.state.contact, { groupID });
    this.setState({ contact: contact });
    console.log("handleGroup");
  };

  componentDidMount() {
    if (!this.props.location.state) {
      axios(`/api/contacts/info/${"invalid"}`).then(
        (response) => {
          if (response.status === 404) {
            this.setState({ isAuth: true, isFound: false });
            //console.log('auth succ',response);
          } else {
            this.setState({
              isAuth: false,
              authFailMsg: response.data.errorMsg,
            });
            //console.log('auth fail',response);
            window.location.href = "/login";
          }
        },
        (error) => {
          this.setState({ isAuth: true, isFound: false });
        }
      );
    } else {
      const {
        contact,
        contact: { _id },
      } = this.props.location.state;
      axios(`/api/contacts/info/${_id}`).then(
        (response) => {
          if (response.data.status === 200) {
            this.setState({ isAuth: true, isFound: true, contact });
            console.log("auth succ", response);
          } else if (response.status === 404) {
            this.setState({ isAuth: true, isFound: false });
            console.log("not found");
          } else {
            this.setState({
              isAuth: false,
              authFailMsg: response.data.errorMsg,
            });
            console.log("auth fail", response);
            window.location.href = "/login";
          }
        },
        (error) => {
          this.setState({ isAuth: false });
        }
      );
    }
  }

  onEmail() {
    const {
      contact: { _id },
    } = this.props.location.state;
    axios(`/api/contacts/updateContactTime/${_id}`);
    window.open("mailto:" + this.state.contact.email);
  }

  render() {
    const { contact, isEdit } = this.state;
    const { isAuth, authFailMsg, isFound } = this.state;
    console.log("contact in info", contact);
    return (
      <Fragment>
        {isAuth && isFound && (
          <>
            <Typography
              className="newContact"
              variant="h4"
              gutterBottom
              component="div"
            >
              Contact Information
            </Typography>
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
                    onChange={this.updateFirstName}
                    label="First Name"
                    fullWidth
                    // defaultValue= {contact.firstName}
                    value={contact.firstName}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updateLastName}
                    label="Last Name"
                    fullWidth
                    value={contact.lastName}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className="contactSelector" component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      onChange={this.updateGender}
                      row
                      aria-label="gender"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        disabled={isEdit ? false : true}
                        checked={contact.gender === "female" ? true : false}
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        disabled={isEdit ? false : true}
                        checked={contact.gender === "male" ? true : false}
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updatePhone}
                    label="Phone Number"
                    fullWidth
                    value={contact.phone}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updateEmail}
                    label="Email Address"
                    fullWidth
                    value={contact.email}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updateDepartment}
                    label="Department"
                    fullWidth
                    value={contact.department}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updateAddress}
                    label="Address"
                    fullWidth
                    value={contact.address}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={this.updateRemark}
                    label="Remark"
                    fullWidth
                    value={contact.remark}
                    InputProps={{
                      readOnly: !isEdit,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <GroupSelector
                    contact={contact}
                    handleGroup={this.handleGroup}
                    isEdit={isEdit}
                    isNew={false}
                  />
                </Grid>

                <Grid item xs={12} sm={6}> 
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<MailOutlineIcon />}
                  //style={{ marginLeft: "3.6vw ", marginTop: "3.5vw", marginBottom: "0.2vw" }}
                  style={{height: "55px" }}
                  onClick={() => this.onEmail()}
                >
                  Send Email
                </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <EditFooter
                    handleEdit={this.handleEdit}
                    handleCancel={this.handleCancel}
                    contactInfo={this.state.contact}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}

        {isAuth && !isFound && (
          <>
            <Typography
              className="newContact"
              variant="h4"
              gutterBottom
              component="div"
            >
              404 NOT FOUND
            </Typography>
          </>
        )}

        {authFailMsg && <AuthFail msg={authFailMsg} />}
      </Fragment>
    );
  }
}
