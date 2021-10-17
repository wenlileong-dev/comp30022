import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import EventPeople from "./EventPeople";

function PopoverEditEvent(props) {
  let originPeople = props.eventDetail.people;
  let modifyPeople = [];
  for (let i = 0; i < originPeople.length; i++) {
    modifyPeople.push(
      `${originPeople[i].firstName} ${originPeople[i].lastName}`
    );
  }
  let [title, setTitle] = useState(props.eventDetail.title);
  let [description, setDescription] = useState(props.eventDetail.description);
  let [date, setDate] = useState(new Date(props.eventDetail.date));
  let [time, setTime] = useState(props.eventDetail.time);
  let [people, setPeople] = useState(modifyPeople);
  let [eventType, setEventType] = useState(props.eventDetail.eventType);
  let [location, setLocation] = useState(props.eventDetail.location);
  let [meetingNotes, setMeetingNotes] = useState(
    props.eventDetail.meetingNotes
  );
  let [meetingLink, setMeetingLink] = useState(props.eventDetail.meetingLink);

  let [peopleValidate, setPeopleValidate] = useState(false);
  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
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
      eventType: undefined,
      location: undefined,
      meetingNotes: undefined,
      meetingLink: undefined,
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
    if (meetingNotes) {
      input.meetingNotes = meetingNotes;
    }
    if (meetingLink) {
      input.meetingLink = meetingLink;
    }
    axios.put(`/api/calendar`, input).then((res) => {
      window.location.href = `/calendar`;
    });
  }

  function handleDelEvent(e) {
    axios.delete(`/api/calendar/${props.eventDetail._id}`).then((res) => {
      props.fetchData();
      props.handleClose(e);
      window.location.href = `/calendar`;
    });
  }

  return (
    <React.Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Details
      </Typography>
      <form onSubmit={handleSubmit} data-testid="edit-event-form">
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
                  data-cy="meetingLink"
                  onChange={handleMeetingLink}
                  value={meetingLink}
                  style={{ width: "100%" }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <EventPeople setPeople={setPeople} people={people} />
            {peopleValidate && (
              <Alert severity="error">Must have a firstName and lastName</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Meeting Notes"
              data-cy="meetingNotes"
              multiline
              rows={4}
              className="form-notes"
              onChange={handleMeetingNotes}
              value={meetingNotes}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              data-cy="update-event-button-submit"
              startIcon={<UpdateIcon />}
            >
              Update Event
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="error"
              type="button"
              data-cy="delete-event-button"
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
