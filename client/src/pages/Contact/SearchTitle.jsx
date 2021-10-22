import React, { useState } from "react";
import Button from "@mui/material/Button";
import SearchPopUp from "./SearchPopUp";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

function SearchTitle(props) {

  let [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
  }
  function toggleSearch() {
    setIsPopupOpen(true);
  }

  return (
    <React.Fragment>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleSearch}
          id="search-contact"
          startIcon={<PersonSearchIcon />}
        >
          search
        </Button>
      </div>
      {isPopupOpen && (
        <SearchPopUp
          renderType="search"
          handleClose={handleClose}
        ></SearchPopUp>
      )}
    </React.Fragment>
  );
}
export default SearchTitle;
