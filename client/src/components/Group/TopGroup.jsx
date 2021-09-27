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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


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

  const GroupTop = (props) => {
    if (props.groupTop){
      return (
        <>
          {/* <Switch {...label} defaultChecked  onClick={topGroup}/> */}

          <Stack direction="row" spacing={1}>
            <IconButton aria-label="cancel-highlight" color="warning" onClick={topGroup}>
              <AutoAwesomeIcon />
            </IconButton>
          </Stack>
        </>
        
        
      )
    }else{
      return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="highlight" onClick={topGroup}>
              <AutoAwesomeIcon />
            </IconButton>
        </Stack>
      )
        
      
    }
  }


  return (
    <>
      {GroupTop(props)}
    </>
    


    // <Switch {...label} defaultChecked  onClick={topGroup}/>

    // <FormControl component="fieldset">
    // {/* <FormLabel component="legend">Label placement</FormLabel> */}
    //   <FormGroup aria-label="position" row>
    //     <FormControlLabel
    //       value="end"
    //       control={<Switch color="primary" />}
    //       onChange={topGroup}
    //       label="highlight"
    //       labelPlacement="end"
    //     />
    //   </FormGroup>
    // </FormControl>

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
