import React, { useState } from "react";

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
      <div onClick={showEventDetail}>
        <p className="mobile-event-title">{props.event.title}</p>
        <p>
          {time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
      {isOpen && (
        <CalendarPopup
          eventDetail={props.event}
          renderType={"mobile-event-detail"}
          handleClose={handleClose}
        />
      )}
    </React.Fragment>
  );
}

export default WeeklyDayEvent;
