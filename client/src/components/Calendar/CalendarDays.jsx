import React from "react";

import CalendarDay from "./CalendarDay";

function CalendarDays(props) {
  let firstDay = new Date(props.year, props.month, 1);
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  let daysInMonth = getDaysInMonth(new Date(props.year, props.month));

  return (
    <div className="calendar-container">
      {[...Array(firstDay.getDay())].map((day, index) => {
        return <CalendarDay day="" />;
      })}
      {[...Array(daysInMonth)].map((day, index) => {
        return <CalendarDay day={index + 1} event={props.events[index]} />;
      })}
    </div>
  );
}

export default CalendarDays;
