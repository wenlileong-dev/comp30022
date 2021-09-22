import React from "react";
import "./Calendar.css";
function CalendarHeader() {
  return (
    <div className="calendar-header" data-testid="mytestid">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
  );
}

export default CalendarHeader;
