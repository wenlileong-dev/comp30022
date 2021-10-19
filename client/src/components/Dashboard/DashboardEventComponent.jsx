import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleEventString from "../Calendar/PeopleEventString";
import Typography from "@mui/material/Typography";
function PopoverEvent(props) {
  // console.log(props)
  let time = new Date(props.event.time);
  let date = new Date(props.event.date).toISOString().slice(0, 10);
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
          <p>{date }</p>
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
            <p></p>
          {props.event.eventType === "Online" ? (
            <p>
              {props.event.eventType} via {props.event.location}
            </p>
          ) : (
            <p>
              {props.event.eventType} at {props.event.location}
            </p>
          )}
          {props.event.meetingLink?(
          <>
          <a href={props.event.meetingLink} style={{color:"blue"}}>Open meeting</a>
          <p></p>
          </>):(
          <Typography variant="body2">
                There is no meeting link for this event
              </Typography>
              )}
            {props.event.meetingNotes ? (
              <>
                <Typography variant="h5">Meeting Notes</Typography>
                <Typography variant="body2">
                  {props.event.meetingNotes}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                There is no meeting notes for this event
              </Typography>
            )}
          
        </CardContent>
      </Card>
    </Grid>
  );
}
export default PopoverEvent;
