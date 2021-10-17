import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";

import CalendarPopup from "./CalendarPopup";

function CalendarDay(props) {
  let [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleOpen(event) {
    setIsPopupOpen(true);
  }

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }

  return (
    <React.Fragment>
      <div
        className="day"
        onClick={handleOpen}
        data-testid={"calendar-a-day"}
        data-cy="curr-month-day"
      >
        {new Date().getDate() === props.day &&
        new Date().getMonth() === props.month ? (
          <p>
            <mark>{props.day}</mark>
          </p>
        ) : (
          <p>{props.day}</p>
        )}

        <div data-cy="day-events">
          {props.event &&
            props.event.map((event, index) => {
              return (
                <Typography
                  variant="body2"
                  gutterBottom
                  key={index}
                  className="task"
                >
                  {new Date(event.time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  {event.title}
                </Typography>
              );
            })}
        </div>
        {isPopupOpen && (
          <CalendarPopup
            renderType="day-events"
            events={props.event}
            handleClose={handleClose}
            fetchData={props.fetchData}
            isPopupOpen={isPopupOpen}
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
