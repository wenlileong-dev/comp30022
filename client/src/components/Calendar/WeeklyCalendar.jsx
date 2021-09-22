import React from "react";
import Grid from "@mui/material/Grid";

import WeeklyDay from "./../Calendar/WeeklyDay";

function WeeklyCalendar(props) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {props.events &&
          props.events.map((day, index) => {
            if (day.length > 0) {
              return <WeeklyDay day={day} key={index} month={props.month} />;
            } else {
              return <></>;
            }
          })}
      </Grid>
    </React.Fragment>
  );
}

export default WeeklyCalendar;
