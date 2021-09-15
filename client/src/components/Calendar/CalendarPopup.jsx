import React, { useState } from "react";

import PopoverEventDetail from "./PopoverEventDetail";
import PopoverAddEvent from "./PopoverAddEvent";
import PopoverEditEvent from "./PopoverEditEvent";

function CalendarPopup(props) {
  // let [isOpen, setIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(props.renderType);
  let [eventDetail, setEventDetail] = useState({});
  // function toggleOpen() {
  //   setIsOpen(!isOpen);
  // }

  function oepnEventDetail() {
    setIsOpen("event-detail");
  }

  return (
    <React.Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {isOpen === "day-events" && (
            <PopoverEventDetail
              events={props.events}
              setEventDetail={setEventDetail}
              toggleEditEvent={oepnEventDetail}
            />
          )}
          {isOpen === "new-event" && (
            <PopoverAddEvent
              year={props.year}
              month={props.month}
              day={props.day}
            />
          )}
          {isOpen === "event-detail" && (
            <PopoverEditEvent eventDetail={eventDetail} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CalendarPopup;
