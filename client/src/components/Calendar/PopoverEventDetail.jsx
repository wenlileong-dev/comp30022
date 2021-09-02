import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PopoverEventComponent from "./PopoverEventComponent";

function PopoverEventDetail(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
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
      <Button
        variant="outlined"
        color="primary"
        onClick={props.toggleAddEvent}
        id="add-event-button"
      >
        + New Event
      </Button>
    </React.Fragment>
  );
}

export default PopoverEventDetail;
