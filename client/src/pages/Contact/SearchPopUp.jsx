import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import PopoverSearch from "./PopoverSearch";
import PopoverAddGroup from '../../components/Group/PopoverAddGroup';

function SearchPopUp(props) {

    let [isOpen, setIsOpen] = useState(props.renderType);
    let [eventDetail, setEventDetail] = useState({});
    
    function oepnEventDetail() {
      setIsOpen("event-detail");
    }
  
    return (
      <React.Fragment>
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>
              x
            </span>
            
            {isOpen === "search" && (
              <PopoverSearch
                // year={props.year}
                // month={props.month}
                // day={props.day}
              />
            )}
            {/* {isOpen === "event-detail" && (
              <PopoverEditGroup eventDetail={eventDetail} />
            )}
            {isOpen === "mobile-event-detail" && (
              <PopoverEditGroup eventDetail={props.eventDetail} />
            )} */}
          </div>
        </div>
      </React.Fragment>
    );
  }
  
  export default SearchPopUp;