import React, { useState } from "react";

import PopoverEventDetail from "./PopoverEventDetail";
import PopoverAddEvent from "./PopoverAddEvent";

function CalendarPopup(props) {
  let [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <React.Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {isOpen ? (
            <PopoverAddEvent
              year={props.year}
              month={props.month}
              day={props.day}
            />
          ) : (
            <PopoverEventDetail
              events={props.events}
              toggleAddEvent={toggleOpen}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CalendarPopup;
