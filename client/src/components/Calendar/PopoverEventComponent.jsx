import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
function PopoverEventComponent(props) {
  function handleOpenEditEvent() {
    props.setEvent(props.event);
    props.openEditEvent();
  }
  let time = new Date(props.event.time);
  return (
    <Grid item xs={12} sm={6}>
      <Card style={{ backgroundColor: "#EAEEF3" }}>
        <CardContent>
          <p>
            {time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {props.event.title}
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
        </CardContent>
      </Card>
    </Grid>
  );
}
export default PopoverEventComponent;
