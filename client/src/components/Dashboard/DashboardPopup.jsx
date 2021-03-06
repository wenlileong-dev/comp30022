import React, { useState } from "react";
import DashboardEventDetail from "./DashboardEventDetail";
import DashboardEditEvent from "./DashboardEditEvent";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
function DashboardPopup(props) {
  let [isOpen, setIsOpen] = useState("");
  let [eventDetail, setEventDetail] = useState({});
  function handleOpen(){
    setIsOpen("day-events");
  }
  function handleClose(){
    setIsOpen("");
  }
  function oepnEventDetail() {
    setIsOpen("event-detail");
  }

  return (
    <React.Fragment>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary={props.events.title} />
          </ListItemButton>
        </ListItem>
      </List>
      {(isOpen === "day-events"||isOpen ==="event-detail") && 
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          {isOpen === "day-events" && (
            <DashboardEventDetail
              events={props.events}
              setEventDetail={setEventDetail}
              toggleEditEvent={oepnEventDetail}
            />
          )}
          {isOpen === "event-detail" && (<DashboardEditEvent eventDetail={eventDetail} />)}
        </div>
      </div>
      }
    </React.Fragment>
  );
}

export default DashboardPopup;