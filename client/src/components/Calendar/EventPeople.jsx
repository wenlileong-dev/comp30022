import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
function EventPeople(props) {
  let [contacts, setContacts] = useState([]);

  const getUserContacts = async () => {
    let result = await axios("/api/contacts/user-contact");
    setContacts(result.data.data);
  };

  const handlePeople = (e, v) => {
    props.setPeople(v);
  };
  useEffect(() => {
    getUserContacts();
  }, []);
  return (
    <React.Fragment>
      {contacts && (
        <Stack spacing={3}>
          <Autocomplete
            multiple
            id="tags-filled"
            defaultValue={props.people}
            options={contacts.map((option) => {
              return `${option.firstName} ${option.lastName}`;
            })}
            freeSolo
            onChange={handlePeople}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="People"
                multiline
              />
            )}
          />
        </Stack>
      )}
    </React.Fragment>
  );
}

export default EventPeople;
