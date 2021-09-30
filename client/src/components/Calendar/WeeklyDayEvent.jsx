import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CalendarPopup from "./CalendarPopup";

function WeeklyDayEvent(props) {
  let [isOpen, setIsOpen] = useState(false);
  const showEventDetail = () => {
    setIsOpen(true);
  };

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
