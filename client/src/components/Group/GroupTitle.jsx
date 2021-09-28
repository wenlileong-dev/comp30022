import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupPopup from "./GroupPopup";

function GroupTitle(props) {

  let [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }
  function toggleAddEvent() {
    setIsPopupOpen(true);
  }

  return (
    <React.Fragment>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleAddEvent}
          id="add-group-button"
          startIcon={<GroupAddIcon />}
        >
          New Group
        </Button>
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
