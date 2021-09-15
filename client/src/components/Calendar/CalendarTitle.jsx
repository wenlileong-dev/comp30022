import React, { useState } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CalendarPopup from "./CalendarPopup";

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

  let [isPopupOpen, setIsPopupOpen] = useState(false);

  // function togglePopup(event) {
  //   console.log(event.target);
  //   setIsPopupOpen(!isPopupOpen);
  // }

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }
  function toggleAddEvent() {
    setIsPopupOpen(true);
  }

  return (
    <React.Fragment>
      {" "}
      <div className="calendar-title">
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <ArrowLeftIcon onClick={props.prevMonth}></ArrowLeftIcon>
            <span className="calendar-month">
              {monthNames[props.month]} {props.year}
            </span>
            <ArrowRightIcon onClick={props.nextMonth}></ArrowRightIcon>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleAddEvent}
              id="add-event-button"
            >
              + New Event
            </Button>
          </Grid>
        </Grid>
      </div>
      {isPopupOpen && (
        <CalendarPopup
          renderType="new-event"
          handleClose={handleClose}
        ></CalendarPopup>
      )}
    </React.Fragment>
  );
}
export default CalendarTitle;
