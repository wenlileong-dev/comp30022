import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import GroupPopup from "./GroupPopup";

function GroupTitle(props) {

  let [isPopupOpen, setIsPopupOpen] = useState(false);

  // function togglePopup(event) {
  //   console.log(event.target);
  //   setIsPopupOpen(!isPopupOpen);
  // }

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }
  function toggleAddEvent() {
    setIsPopupOpen(true);
  }

  return (
    <React.Fragment>
      <div className="group-title">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleAddEvent}
              id="add-group-button"
              startIcon={<AddBoxIcon />}
            >
              New Group
            </Button>
          </Grid>
        </Grid>
      </div>
      {isPopupOpen && (
        <GroupPopup
          renderType="new-group"
          handleClose={handleClose}
        ></GroupPopup>
      )}
    </React.Fragment>
  );
}
export default GroupTitle;
