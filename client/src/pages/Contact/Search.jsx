import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
function Search() {
  let [contacts, setContacts] = useState([]);
  let history = useHistory();
  const getUserContacts = async () => {
    let result = await axios("/api/contacts/user-contact");
    setContacts(result.data.data);
  };

  useEffect(() => {
    getUserContacts();
  }, []);

  return (
    <React.Fragment>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        sx={{ width: 300 }}
        freeSolo
        options={contacts}
        getOptionLabel={(option) => {
          return `${option.firstName} ${option.lastName}`;
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              placeholder="Search"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          );
        }}
        onChange={(e, v) => {
          const location = {
            pathname: `/contact/info`,
            state: { contact: v },
          };
          history.push(location);
        }}
      />
    </React.Fragment>
  );
}
export default Search;
