import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

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
    // event.stopPropagation();
    setIsPopupOpen(false);
  }
  function toggleAddEvent() {
    setIsPopupOpen(true);
  }

  return (
    <React.Fragment>
      <div className="calendar-header" title="calendar-title">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <IconButton
                  color="primary"
                  component="span"
                  data-cy="calendar-prevMonth"
                >
                  <ArrowLeftIcon onClick={props.prevMonth} />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <h1 data-cy="calendar-month-title">
                  {monthNames[props.month]}
                </h1>
                <p data-cy="calendar-year-title">{props.year}</p>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  color="primary"
                  component="span"
                  data-cy="calendar-nextMonth"
                >
                  <ArrowRightIcon onClick={props.nextMonth} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleAddEvent}
              id="add-event-button"
              data-cy="add-event-button"
              startIcon={<AddBoxIcon />}
            >
              New Event
            </Button>
          </Grid>
        </Grid>
      </div>
      {isPopupOpen && (
        <CalendarPopup
          renderType="new-event"
          handleClose={handleClose}
          isPopupOpen={isPopupOpen}
          fetchData={props.fetchData}
        ></CalendarPopup>
      )}
    </React.Fragment>
  );
}
export default CalendarTitle;
