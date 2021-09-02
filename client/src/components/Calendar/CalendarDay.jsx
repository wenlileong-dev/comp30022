import React, { useState } from "react";

import CalendarPopup from "./CalendarPopup";

function CalendarDay(props) {
  let [isPopupOpen, setIsPopupOpen] = useState(false);

  // function togglePopup(event) {
  //   console.log(event.target);
  //   setIsPopupOpen(!isPopupOpen);
  // }

  function handleOpen(event) {
    setIsPopupOpen(true);
  }

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }

  return (
    <React.Fragment>
      <div className="calendar-day" onClick={handleOpen}>
        <p>{props.day}</p>
        <div>
          {props.event &&
            props.event.map((event) => {
              return <p className="calendar-event">{event.title}</p>;
            })}
        </div>
        {isPopupOpen && (
          <CalendarPopup
            events={props.event}
            handleClose={handleClose}
            year={props.year}
            month={props.month}
            day={props.day}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default CalendarDay;
