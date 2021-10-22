import React from "react";
import Grid from "@mui/material/Grid";

import WeeklyDay from "./../Calendar/WeeklyDay";
import EmptyComponent from "./EmptyComponent";

function WeeklyCalendar(props) {
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {props.events &&
          props.events.map((day, index) => {
            if (day.length > 0) {
              return <WeeklyDay day={day} key={index} month={props.month} />;
            } else {
              return <EmptyComponent key={`Empty${index}`} />;
            }
          })}
      </Grid>
    </React.Fragment>
  );
}

export default WeeklyCalendar;
