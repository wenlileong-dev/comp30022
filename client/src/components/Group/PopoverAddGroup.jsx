import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";

function PopoverAddGroup(props) {
  let [groupName, setGroup] = useState("");

  function handleGroup(event) {
    setGroup(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let input = {
      groupName: undefined,
    };
    if (groupName) {
      input.groupName = groupName;
    }

    axios.post(`api/group/create`, input).then((res) => {
      window.location.href = `/contact`;
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              required
              label="groupName"
              onChange={handleGroup}
              value={groupName}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={<AddBoxIcon />}
            >
              Add Group
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default PopoverAddGroup;
