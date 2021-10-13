import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";

import EventPeople from "./EventPeople";

function PopoverAddEvent(props) {
  // let today = new Date();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [date, setDate] = useState(new Date());
  let [time, setTime] = useState(null);
  let [alertTime, setAlertTime] = useState(false);
  let [people, setPeople] = useState([]);
  let [eventType, setEventType] = useState("Online");
  let [location, setLocation] = useState("Zoom");
  let [meetingLink, setMeetingLink] = useState("");

  let [peopleValidate, setPeopleValidate] = useState(false);

  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }
  // function handlePeople(e) {
  //   setPeople(e.target.value);
  // }
  function handleEventType(e) {
    setEventType(e.target.value);
    if (e.target.value === "Online") {
      setLocation("Zoom");
    } else {
      setLocation("");
    }
  }
  function handleLocation(e) {
    setLocation(e.target.value);
  }

  function handleMeetingLink(e) {
    setMeetingLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let input = {
      title: undefined,
      description: undefined,
      date: undefined,
      time: undefined,
      people: undefined,
      eventtype: undefined,
      location: undefined,
      meetingLink: undefined,
    };
    if (title) {
      input.title = title;
    }
    if (description) {
      input.description = description;
    }
    if (date) {
      input.date = date;
    }
    if (time) {
      input.time = time;
    } else {
      setAlertTime(true);
      return;
    }
    if (people) {
      for (let i = 0; i < people.length; i++) {
        let splitName = people[i].split(" ");
        if (splitName.length !== 2) {
          setPeopleValidate(true);
          return;
        }
      }
      input.people = people;
    }
    if (eventType) {
      input.eventType = eventType;
    }
    if (location) {
      input.location = location;
    }
    if (meetingLink) {
      input.meetingLink = meetingLink;
    }
    axios.post(`/api/calendar`, input).then((res) => {
      console.log(res.data);
      window.location.href = `/calendar`;
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} data-testid="add-event-form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              required
              label="Title"
              onChange={handleTitle}
              value={title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              label="Description"
              multiline
              onChange={handleDescription}
              value={description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                  if (alertTime) {
                    setAlertTime(false);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {alertTime && <Alert severity="error">Time is required</Alert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className="event-type-select" variant="standard">
              <InputLabel>Event Type</InputLabel>
              <Select value={eventType} onChange={handleEventType}>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {eventType !== "Online" ? (
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                label="Location"
                onChange={handleLocation}
                value={location}
                required
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <FormControl className="event-type-select" variant="standard">
                  <InputLabel>Location</InputLabel>
                  <Select value={location} onChange={handleLocation}>
                    <MenuItem value="Zoom">Zoom</MenuItem>
                    <MenuItem value="Microsoft Team">Microsoft Team</MenuItem>
                    <MenuItem value="Google Meet">Google Meet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  label="Meeting Link"
                  onChange={handleMeetingLink}
                  value={meetingLink}
                  style={{ width: "100%" }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <EventPeople setPeople={setPeople} people={[]} />
            {peopleValidate && (
              <Alert severity="error">Invalid People Input</Alert>
            )}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={<AddBoxIcon />}
            >
              Add Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default PopoverAddEvent;
