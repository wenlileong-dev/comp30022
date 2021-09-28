import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DashboardPopup from "./DashboardPopup";

function DashboardDay(props) {
  let [isPopupOpen, setIsPopupOpen] = useState(false);
  let [isShowOne, setIsShowOne] = useState(false);

  function handleOpen(event) {
    setIsPopupOpen(true);
    // setIsShowOne(true);
  }
  function handleShow(event){
    setIsShowOne(true)
  }
  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
    setIsShowOne(false);
  }
  console.log(props.firstName)
  return (
    <React.Fragment>
      <div>
        
          <Typography gutterBottom variant="h4" component="div">
            {props.contacts.firstName} {props.contacts.lastName}
          </Typography>
        
        {/* <div> */}
        {/* {props.event.length === 0 && (
            <Typography variant="subtitle2" component="div">
              No event for this day
            </Typography>
          )} */}
          {/* {props.event &&
            props.event.map((event, index) => {
              return (
                <div>
                  <DashboardPopup
                  // renderType="day-events"
                  events={event}
                  handleClose={handleClose}
                  year={props.year}
                  month={props.month}
                  day={props.day}
                />
                </div>
              );
            })} */}
        {/* </div> */}
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;