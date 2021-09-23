import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PopoverEventComponent from "./PopoverEventComponent";

function PopoverEventDetail(props) {
  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {props.events &&
            props.events.map((event, index) => {
              return (
                <PopoverEventComponent
                  event={event}
                  setEvent={props.setEventDetail}
                  openEditEvent={props.toggleEditEvent}
                  key={index}
                />
              );
            })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default PopoverEventDetail;
