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
        className="calendar-day"
        onClick={handleOpen}
        data-testid={"calendar-a-day"}
      >
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
