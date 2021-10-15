import React from "react";
import "./../components/Calendar/CalendarMonth.scss";

import CalendarHeader from "../components/Calendar/CalendarHeader";

function TestCalendar() {
  return (
    <React.Fragment>
      <div className="calendar-container">
        <div className="calendar-header">
          <h1>November</h1>
          <p>2018</p>
        </div>
        <div className="calendar">
          <CalendarHeader />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TestCalendar;
