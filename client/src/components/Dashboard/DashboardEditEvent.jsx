import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";


function DashboardEditEvent(props) {
  let title = props.eventDetail.title;
  let description = props.eventDetail.description;
  let date=new Date(props.eventDetail.date).toISOString().slice(0, 10);
  let time = props.eventDetail.time;
  let people = props.eventDetail.people;
  let eventType = props.eventDetail.eventType;
  let location =props.eventDetail.location;
  let meetingNotes = props.eventDetail.meetingNotes;

  return (
    <React.Fragment>
      <h2>Details</h2>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
            disabled
              variant="standard"
              required
              label="Title"
              value={title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          {description&&<TextField
            disabled
              variant="standard"
              label="Description"
              multiline
              value={description}
            />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            disabled
              variant="standard"
              label="Date"
              multiline
              value={date}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            disabled
              variant="standard"
              label="Time"
              multiline
              value={new Date(time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          {people&&<TextField
            disabled
              variant="standard"
              label="People"
              multiline
              placeholder="separate by comma"
              value={people}
            />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className="event-type-select" variant="standard">
              <TextField
            disabled
              variant="standard"
              label="Event Type"
              multiline
              value={eventType}
            />
            </FormControl>
          </Grid>
          {eventType !== "Online" ? (
            <Grid item xs={12} sm={6}>
              <TextField
              disabled
                variant="standard"
                label="Location"
                value={location}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <FormControl className="event-type-select" variant="standard">
                <TextField
            disabled
              variant="standard"
              label="Location"
              multiline
              value={location}
            />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            {meetingNotes&&<TextField
            disabled
              variant="standard"
              label="Meeting Notes"
              multiline
              rows={4}
              className="form-notes"
              value={meetingNotes}
            />}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default DashboardEditEvent;