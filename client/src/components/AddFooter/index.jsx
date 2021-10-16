import React, { Component, Fragment } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { withRouter } from "react-router-dom";

class AddFooter extends Component {
  state = {
    error: false,
    success: false,
    contact: {},
  };

  back = () => {
    this.props.history.push("/contact");
  };

  handleConfirm = async () => {
    // console.log('confirm');
    let data = { contact: { ...this.props } };
    try {
      let result = await axios.post("/api/contacts/add-contact", data);
      this.setState({ error: false, success: true });
      this.setState({ contact: result.data.newContact });
      this.props.history.push(`/contact`);
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    // const group = this.props.group;
    // group.contacts.push('123');
    // console.log('confirm',this.props.groupID)

    const { error, success } = this.state;
    return (
      <Fragment>
        <Stack spacing={3} direction="row">
          <Button variant="contained" type="submit" onClick={this.back}>
            Back to Group
          </Button>

          <Button
            variant="contained"
            type="submit"
            onClick={this.handleConfirm}

            // style={{display:'block', margin:'auto'}}
            // disabled={success}
          >
            Confirm
          </Button>
        </Stack>

        <br />
        <br />
        <Alert severity="warning" style={{ display: error ? "" : "none" }}>
          <AlertTitle>Warning</AlertTitle>
          Invalid Information Form — <strong>check it out!</strong>
        </Alert>

        <Alert severity="success" style={{ display: success ? "" : "none" }}>
          <AlertTitle>Success</AlertTitle>
          Submitted Successful!
        </Alert>
      </Fragment>
    );
  }
}

export default withRouter(AddFooter);
