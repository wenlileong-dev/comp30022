import React from "react";

function CalendarEmptyDay() {
  return (
    <React.Fragment>
      <div className="day day--disabled" data-cy="prev-month-day"></div>
    </React.Fragment>
  );
}

export default CalendarEmptyDay;
