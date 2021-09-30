import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CardActions from "@mui/material/CardActions";

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

  const handleExpandNotes = () => {
    setExpandNotes(!expandNotes);
  };
  function handleOpenEditEvent() {
    props.setEvent(props.event);
    props.openEditEvent();
  }
  let time = new Date(props.event.time);
  return (
    <Grid item xs={9}>
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
            {props.event.people.toString()}
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
          <CardActions disableSpacing>
            <Button variant="outlined" size="small" id="space-btw-event-button">
              Open Meeting
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenEditEvent}
            >
              Event Details
            </Button>
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
