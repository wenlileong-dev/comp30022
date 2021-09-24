import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
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
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

function PopoverEditEvent(props) {
  let [title, setTitle] = useState(props.eventDetail.title);
  let [description, setDescription] = useState(props.eventDetail.description);
  let [date, setDate] = useState(
    new Date(props.eventDetail.date).toISOString().slice(0, 10)
  );
  let [time, setTime] = useState(props.eventDetail.time);
  let [people, setPeople] = useState(props.eventDetail.people.toString());
  let [eventType, setEventType] = useState(props.eventDetail.eventType);
  let [location, setLocation] = useState(props.eventDetail.location);
  let [meetingNotes, setMeetingNotes] = useState(
    props.eventDetail.meetingNotes
  );
  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
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
  function handleMeetingNotes(e) {
    setMeetingNotes(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let input = {
      title: undefined,
      description: undefined,
      date: undefined,
      time: undefined,
      people: undefined,
      eventType: undefined,
      location: undefined,
      meetingNotes: undefined,
    };
    input.eventID = props.eventDetail._id;
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
    if (meetingNotes) {
      input.meetingNotes = meetingNotes;
    }
    console.log(input);
    axios.put(`/api/calendar`, input).then((res) => {
      console.log(res.data);
      window.location.href = `/calendar`;
    });
  }

  function handleDelEvent() {
    axios.delete(`/api/calendar/${props.eventDetail._id}`).then((res) => {
      window.location.href = `/calendar`;
    });
  }
  return (
    <React.Fragment>
      <h2>Details</h2>
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
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
                  <MenuItem value="Google Meet">Google Meet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Meeting Notes"
              multiline
              rows={4}
              className="form-notes"
              onChange={handleMeetingNotes}
              value={meetingNotes}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              startIcon={<UpdateIcon />}
            >
              Update Event
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={handleDelEvent}
              startIcon={<DeleteIcon />}
            >
              Delete Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default PopoverEditEvent;
