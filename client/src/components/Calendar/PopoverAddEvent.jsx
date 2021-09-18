import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function PopoverAddEvent(props) {
  let today = new Date();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [date, setDate] = useState(today.toISOString().slice(0, 10));
  let [time, setTime] = useState("");
  let [people, setPeople] = useState("");
  let [eventType, setEventType] = useState("Online");
  let [location, setLocation] = useState("Zoom");

  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }
  function handleDate(e) {
    setDate(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }
  function handlePeople(e) {
    setPeople(e.target.value);
  }
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
    }
    if (people) {
      input.people = people;
    }
    if (eventType) {
      input.eventType = eventType;
    }
    if (location) {
      input.location = location;
    }
    axios.post(`/api/calendar`, input).then((res) => {
      console.log(res.data);
      window.location.href = `/calendar`;
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
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
            <TextField
              variant="standard"
              label="Date"
              type="date"
              required
              value={date}
              onChange={handleDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              required
              label="Time"
              type="time"
              value={time}
              onChange={handleTime}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="standard"
              label="People"
              multiline
              placeholder="separate by comma"
              onChange={handlePeople}
              value={people}
            />
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
            <Grid item xs={12} sm={6}>
              <FormControl className="event-type-select" variant="standard">
                <InputLabel>Location</InputLabel>
                <Select value={location} onChange={handleLocation}>
                  <MenuItem value="Zoom">Zoom</MenuItem>
                  <MenuItem value="Microsoft Team">Microsoft Team</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
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
