import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
function PopoverEventComponent(props) {
  function handleOpenEditEvent() {
    props.setEvent(props.event);
    props.openEditEvent();
  }
  return (
    <div className="event-detail">
      <Grid item xs>
        <p>
          {props.event.time} {props.event.title}
        </p>
        <p>{props.event.description}</p>
        <p>{props.event.people.toString()}</p>
        {props.event.eventType === "Online" ? (
          <p>
            {props.event.eventType} via {props.event.location}
          </p>
        ) : (
          <p>
            {props.event.eventType} at {props.event.location}
          </p>
        )}
        <Button
          color="default"
          variant="outlined"
          size="small"
          id="space-btw-event-button"
        >
          Open Meeting
        </Button>
        <Button
          color="default"
          variant="contained"
          size="small"
          onClick={handleOpenEditEvent}
        >
          Event Details
        </Button>
      </Grid>
    </div>
  );
}
export default PopoverEventComponent;
