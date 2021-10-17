import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleEventString from "../Calendar/PeopleEventString";
function PopoverEvent(props) {
  // console.log(props)
  let time = new Date(props.event.time);
  // console.log(props.setEvent(props.event))
  // console.log(props.openEditEvent())
  function handleOpenEvent() {
    props.setEvent(props.event);
    // console.log(props.event)
    props.openEditEvent();
  }
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
          {props.event.people &&
            props.event.people.map((person, index) => {
              return (
                <PeopleEventString
                  key={`eventPerson ${index}`}
                  person={person}
                />
              );
            })}

          {props.event.eventType === "Online" ? (
            <p>
              {props.event.eventType} via {props.event.location}
            </p>
          ) : (
            <p>
              {props.event.eventType} at {props.event.location}
            </p>
          )}
          <Button variant="contained" size="small" onClick={handleOpenEvent}>
            Event Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
export default PopoverEvent;
