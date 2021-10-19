import React, { Component, Fragment } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PubSub from "pubsub-js";

export default class GroupSelector extends Component {
  state = {
    groupID: "",
    allGroups: [],
  };

  // Update groupID
  handleChange = (e) => {
    this.setState({ groupID: e.target.value });
    this.props.handleGroup(e.target.value);
  };

  componentDidMount() {
    axios.get("/api/group/all").then(
      (response) => {
        this.setState({ allGroups: response.data.allGroups });
        // console.log("update allGroups");
        if (this.props.contact === undefined) {
          this.setState({ groupID: response.data.allGroups[0]._id });
          this.props.handleGroup(response.data.allGroups[0]._id);
        } else {
          this.setState({ groupID: this.props.contact.groupID });
          // console.log("update GroupID");
        }
      },
      (error) => {}
    );

    // Update groupID when edition is cancled
    this.token = PubSub.subscribe("groupID", (msg, stateObj) => {
      this.setState(stateObj);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    // console.log('render group')
    const { groupID, allGroups } = this.state;
    const { contact, isEdit } = this.props;
    //console.log('contact in selector', contact);
    return (
      <Fragment>
        <FormControl variant="filled" className="event-type-select">
          <InputLabel id="demo-simple-select-filled-label">Group</InputLabel>
          <Select
            readOnly={!isEdit}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={isEdit ? groupID : contact.groupID}
            onChange={this.handleChange}
            // autoWidth
            label="Group"
          >
            {allGroups.map((groupObj) => {
              return (
                <MenuItem key={groupObj._id} value={groupObj._id}>
                  {groupObj.groupName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Fragment>
    );
  }
}
