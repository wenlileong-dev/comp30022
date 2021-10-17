import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DashboardEventComponent from "./DashboardEventComponent";

function DashboardEventDetail(props) {
  // console.log(props)
  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <DashboardEventComponent
            event={props.events}
            setEvent={props.setEventDetail}
            openEditEvent={props.toggleEditEvent}
          />
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default DashboardEventDetail;