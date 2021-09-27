import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function TopGroup(props) {



  // function togglePopup(event) {
  //   console.log(event.target);
  //   setIsPopupOpen(!isPopupOpen);
  // }


  function topGroup() {
    //console.log(props);
    const input = {"id": props.groupID};
  axios.post(`/group/top`, input).then((res) => {
      console.log(res.data);
      window.location.href = `/contact`;
    });
  }

  return (
    <FormControl component="fieldset">
    {/* <FormLabel component="legend">Label placement</FormLabel> */}
    <FormGroup aria-label="position" row>
      <FormControlLabel
        value="end"
        control={<Switch color="primary" />}
        onClick={topGroup}
        label="highlight"
        labelPlacement="end"
      />
    </FormGroup>
  </FormControl>

    // <React.Fragment>
    //   <div className="calendar-title">
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} sm={6}>
    //         <Grid container spacing={2}>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <Button
    //           size="small"
    //           variant="contained"
    //           color="primary"
    //           onClick={topGroup}
    //           id="add-group-button"
    //           startIcon={<AddBoxIcon />}
    //         >
    //           highlight
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </React.Fragment>
  );
}
export default TopGroup;