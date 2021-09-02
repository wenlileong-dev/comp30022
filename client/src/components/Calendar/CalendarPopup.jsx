import React, { useState } from "react";

import PopoverEventDetail from "./PopoverEventDetail";
import PopoverAddEvent from "./PopoverAddEvent";
import PopoverEditEvent from "./PopoverEditEvent";

function CalendarPopup(props) {
  // let [isOpen, setIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(0);
  let [eventDetail, setEventDetail] = useState({});
  // function toggleOpen() {
  //   setIsOpen(!isOpen);
  // }
  function openAddEvent() {
    setIsOpen(1);
  }

  function oepnEventDetail() {
    setIsOpen(2);
  }

  return (
    <React.Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {isOpen === 0 && (
            <PopoverEventDetail
              events={props.events}
              setEventDetail={setEventDetail}
              toggleEditEvent={oepnEventDetail}
              toggleAddEvent={openAddEvent}
            />
          )}
          {isOpen === 1 && (
            <PopoverAddEvent
              year={props.year}
              month={props.month}
              day={props.day}
            />
          )}
          {isOpen === 2 && <PopoverEditEvent eventDetail={eventDetail} />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CalendarPopup;
