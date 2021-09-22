import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

function PopoverAddEvent(props) {
  let today = new Date();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [date, setDate] = useState(today.toISOString().slice(0, 10));
  let [time, setTime] = useState("");
  let [people, setPeople] = useState("");
  let [eventType, setEventType] = useState("");
  let [location, setLocation] = useState("");

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
              required
              label="Title"
              onChange={handleTitle}
              value={title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              multiline
              onChange={handleDescription}
              value={description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
              label="People"
              multiline
              placeholder="separate by comma"
              onChange={handlePeople}
              value={people}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className="event-type-select">
              <InputLabel>Event Type</InputLabel>
              <Select native value={eventType} onChange={handleEventType}>
                <option aria-label="None" value="" />
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              onChange={handleLocation}
              value={location}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="outlined" color="primary" type="submit">
              Add Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default PopoverAddEvent;
