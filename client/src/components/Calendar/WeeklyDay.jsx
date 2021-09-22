import React from "react";
import Grid from "@mui/material/Grid";

import WeeklyDayEvent from "./WeeklyDayEvent";
function WeeklyDay(props) {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <p>{weekDays[new Date(props.day[0].date).getDay()]}</p>
        <p>
          {new Date(props.day[0].date).getDate()}/{props.month}
        </p>
      </Grid>
      <Grid item xs={8}>
        {props.day.map((event, index) => {
          return <WeeklyDayEvent key={index} event={event} />;
        })}
      </Grid>
    </React.Fragment>
  );
}

export default WeeklyDay;
