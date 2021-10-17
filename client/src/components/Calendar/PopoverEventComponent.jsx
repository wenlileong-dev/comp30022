import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CardActions from "@mui/material/CardActions";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import PeopleEventString from "./PeopleEventString";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function PopoverEventComponent(props) {
  const [expandNotes, setExpandNotes] = React.useState(false);
  let [noMeetingLink, setNoMeetingLink] = React.useState(false);

  const handleExpandNotes = () => {
    setExpandNotes(!expandNotes);
  };
  function handleOpenEditEvent() {
    props.setEvent(props.event);
    props.openEditEvent();
  }

  function handleOpenMeeting(event) {
    if (props.event.meetingLink) {
      const newWindow = window.open(
        props.event.meetingLink,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    } else {
      setNoMeetingLink(true);
    }
  }
  let time = new Date(props.event.time);

  return (
    <Grid item xs={9} data-testid="event-day-component">
      <Card style={{ backgroundColor: "#EAEEF3" }}>
        <CardContent>
          <Typography variant="h5" component="div" lineHeight={2}>
            {time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {props.event.title}
          </Typography>
          <Typography variant="body1" lineHeight={2} color="text.secondary">
            {props.event.description}
          </Typography>
          <Typography variant="body1" lineHeight={2}>
            {props.event.people &&
              props.event.people.map((person, index) => {
                return (
                  <PeopleEventString
                    key={`eventPerson ${index}`}
                    person={person}
                  />
                );
              })}
          </Typography>
          {props.event.eventType === "Online" ? (
            <Typography variant="subtitle1" lineHeight={2}>
              {props.event.eventType} via {props.event.location}
            </Typography>
          ) : (
            <Typography variant="subtitle1" lineHeight={2}>
              {props.event.eventType} at {props.event.location}
            </Typography>
          )}
          {noMeetingLink && (
            <Alert severity="info">Meeting Link is not provided</Alert>
          )}
          <CardActions disableSpacing>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                size="small"
                onClick={handleOpenMeeting}
              >
                Open Event
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
                onClick={handleOpenEditEvent}
                mx={5}
              >
                Edit Event
              </Button>
            </Stack>

            <ExpandMore expand={expandNotes} onClick={handleExpandNotes}>
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </CardContent>

        <Collapse in={expandNotes} timeout="auto" unmountOnExit>
          <CardContent>
            {props.event.meetingNotes ? (
              <>
                <Typography variant="h5">Meeting Notes</Typography>
                <Typography paragraph>{props.event.meetingNotes}</Typography>
              </>
            ) : (
              <Typography paragraph>
                There is no meeting notes for this event
              </Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
export default PopoverEventComponent;
