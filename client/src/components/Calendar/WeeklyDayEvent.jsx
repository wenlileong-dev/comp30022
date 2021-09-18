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
  return (
    <React.Fragment>
      <div onClick={showEventDetail}>
        <p className="mobile-event-title">{props.event.title}</p>
        <p>{props.event.time}</p>
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
