import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarPopup from "./CalendarPopup";
import PeopleEventString from "./PeopleEventString";

function WeeklyDayEvent(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [linkDisable, setLinkDisable] = React.useState(false);
  const showEventDetail = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    checkLinkExist();
  }, []);

  function checkLinkExist() {
    if (props.event.meetingLink) {
      setLinkDisable(false);
    } else {
      setLinkDisable(true);
    }
  }

  function handleOpenMeeting(event) {
    const newWindow = window.open(
      props.event.meetingLink,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }

  const handleClose = () => {
    setIsOpen(false);
  };
  let time = new Date(props.event.time);
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <mark>
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </mark>{" "}
            <span className="mobile-event-title">{props.event.title}</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">
            {props.event.description}
          </Typography>
          <Typography variant="body1" my={2}>
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
            <Typography variant="subtitle1" my={2}>
              {props.event.eventType} via {props.event.location}
            </Typography>
          ) : (
            <Typography variant="subtitle1" my={2}>
              {props.event.eventType} at {props.event.location}
            </Typography>
          )}
          {props.event.meetingNotes && (
            <>
              <Typography variant="h5">Meeting Notes</Typography>
              <Typography paragraph>{props.event.meetingNotes}</Typography>
            </>
          )}

          <AccordionActions>
            <Button
              variant="contained"
              type="button"
              onClick={handleOpenMeeting}
              disabled={linkDisable}
              startIcon={<OpenInNewIcon />}
              size="small"
            >
              Meeting
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={showEventDetail}
              startIcon={<EditIcon />}
              size="small"
            >
              Edit
            </Button>
          </AccordionActions>
        </AccordionDetails>
      </Accordion>
      {isOpen && (
        <CalendarPopup
          eventDetail={props.event}
          renderType={"mobile-event-detail"}
          handleClose={handleClose}
          isPopupOpen={isOpen}
        />
      )}
    </React.Fragment>
  );
}

export default WeeklyDayEvent;
