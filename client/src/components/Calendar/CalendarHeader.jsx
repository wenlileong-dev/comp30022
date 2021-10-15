import React from "react";
import "./CalendarMonth.scss";
function CalendarHeader() {
  return (
    <React.Fragment>
      <span className="day-name">Sun</span>
      <span className="day-name">Mon</span>
      <span className="day-name">Tue</span>
      <span className="day-name">Wed</span>
      <span className="day-name">Thu</span>
      <span className="day-name">Fri</span>
      <span className="day-name">Sat</span>
    </React.Fragment>
  );
}

export default CalendarHeader;
