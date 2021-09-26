import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";

function GroupFooter(props) {



  // function togglePopup(event) {
  //   console.log(event.target);
  //   setIsPopupOpen(!isPopupOpen);
  // }


  function deleteGroup() {
      //console.log(props);
      const input = {"id": props.groupID};
    axios.post(`/group/delete`, input).then((res) => {
        console.log(res.data);
        window.location.href = `/contact`;
      });
  }

  return (
    <React.Fragment>
      <div className="calendar-title">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={deleteGroup}
              id="add-group-button"
              startIcon={<AddBoxIcon />}
            >
              Delete Group
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
export default GroupFooter;
