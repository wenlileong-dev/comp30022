import React, { Component, Fragment } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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

  handleConfirm = () => {
    // console.log('confirm');
    axios({
      method: "POST",
      url: "http://localhost:3000/api/contacts/add-contact",
      data: {
        contact: {
          ...this.props,
        },
      },
    }).then(
      (response) => {
        this.setState({ error: false, success: true });

        this.setState({ contact: response.data.newContact });
        // console.log(response);
        //this.props.history.push(`/contact/info`, {contact:this.state.contact});
        this.props.history.push(`/contact`);
      },
      (error) => {
        // alert("Invalid Information Form");
        this.setState({ error: true, success: false });
      }
    );
  };

  render() {
    // const group = this.props.group;
    // group.contacts.push('123');
    // console.log('confirm',this.props.groupID)

    const { error, success } = this.state;
    return (
      <Fragment>
        <Button
          variant="contained"
          type="submit"
          onClick={this.back}
          sx={{
            marginLeft: "32px",
          }}
        >
          Back to Group
        </Button>

        <Button
          variant="contained"
          type="submit"
          onClick={this.handleConfirm}
          sx={{
            float: "right",
            marginRight: "34px",
          }}
          // style={{display:'block', margin:'auto'}}
          // disabled={success}
        >
          Confirm
        </Button>

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
