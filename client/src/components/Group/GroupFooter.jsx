import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

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
      {/* <Stack direction="row" spacing={1}>
        <IconButton aria-label="cancel-highlight" onClick={deleteGroup}>
          <DeleteIcon />
        </IconButton>
      </Stack> */}
      {/* <div className="calendar-title">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={deleteGroup}
              id="add-group-button"
              startIcon={<AddBoxIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </div> */}

      <div className="calendar-title">
        <Grid container spacing={80}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="cancel-highlight" onClick={deleteGroup}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </div>
      
    </React.Fragment>
  );
}
export default GroupFooter;
