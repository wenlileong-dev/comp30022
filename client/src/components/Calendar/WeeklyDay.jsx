import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";

import WeeklyDayEvent from "./WeeklyDayEvent";
function WeeklyDay(props) {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <React.Fragment>
      <Grid item xs={2}>
        <p>{weekDays[new Date(props.day[0].date).getDay()]}</p>
        {new Date().getDate() === new Date(props.day[0].date).getDate() &&
        new Date().getMonth() + 1 === props.month ? (
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: indigo[500], width: 24, height: 24 }}>
              {new Date(props.day[0].date).getDate()}
            </Avatar>
          </Stack>
        ) : (
          <p>{new Date(props.day[0].date).getDate()}</p>
        )}
      </Grid>
      <Grid item xs={10}>
        {props.day.map((event, index) => {
          return <WeeklyDayEvent key={index} event={event} />;
        })}
      </Grid>
    </React.Fragment>
  );
}

export default WeeklyDay;
