import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Alert from "@mui/material/Alert";
import CalendarPopup from "./CalendarPopup";

function WeeklyDayEvent(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [noMeetingLink, setNoMeetingLink] = useState(false);
  const showEventDetail = () => {
    setIsOpen(true);
  };

  function handleOpenMeeting() {
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

  const handleClose = () => {
    setIsOpen(false);
  };
  let time = new Date(props.event.time);
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <div onClick={showEventDetail}>
            <p className="mobile-event-title">{props.event.title}</p>
            <p>
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </p>
            {props.event.eventType === "Online" ? (
              <p>
                {props.event.eventType} via {props.event.location}
              </p>
            ) : (
              <p>
                {props.event.eventType} at {props.event.location}
              </p>
            )}
          </div>
          <Button
            variant="contained"
            type="button"
            onClick={handleOpenMeeting}
            startIcon={<OpenInNewIcon />}
            size="small"
          >
            Meeting
          </Button>
          {noMeetingLink && (
            <Alert severity="info">Meeting Link is not provided</Alert>
          )}
        </CardContent>
      </Card>

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
