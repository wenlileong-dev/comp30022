import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";

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
        {new Date().getDate() === props.day &&
        new Date().getMonth() === props.month ? (
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: indigo[500], width: 22, height: 22 }}>
              {props.day}
            </Avatar>
          </Stack>
        ) : (
          <p>{props.day}</p>
        )}

        <div>
          {props.event &&
            props.event.map((event, index) => {
              return (
                <Typography variant="body2" gutterBottom key={index}>
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
