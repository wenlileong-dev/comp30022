import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";

import DashboardPopup from "./DashboardPopup";

function DashboardDay(props) {
  let [isPopupOpen, setIsPopupOpen] = useState(false);


  function handleOpen(event) {
    setIsPopupOpen(true);
  }

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }
  console.log(props)
  return (
    <React.Fragment>
      <div>
        {new Date().getDate() === props.day &&
        new Date().getMonth() === props.month ? (
          <div>{new Date().getDate()}/{props.month}/{props.year}</div>
        ) : (
          <p>{props.day}/{props.month}/{props.year}</p>
        )}

        <div>
          {props.event &&
            props.event.map((event, index) => {
              return (
                <Typography variant="body2" gutterBottom key={index} onClick={handleOpen}>
                  {event.title}
                </Typography>
              );
            })}
        </div>
        {isPopupOpen && (
          <DashboardPopup
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

export default DashboardDay;