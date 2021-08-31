import React from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

function CalendarTitle(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-title">
      <ArrowLeftIcon onClick={props.prevMonth}></ArrowLeftIcon>
      <span className="calendar-month">
        {monthNames[props.month]} {props.year}
      </span>
      <ArrowRightIcon onClick={props.nextMonth}></ArrowRightIcon>
    </div>
  );
}
export default CalendarTitle;
