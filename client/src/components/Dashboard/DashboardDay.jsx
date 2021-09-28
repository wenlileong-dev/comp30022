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
  console.log(props)
  return (
    <React.Fragment>
      <div>
        {new Date().getDate() === props.day &&
        new Date().getMonth()  === props.month ? (
          <Typography gutterBottom variant="h4" component="div">
            {new Date().getDate()}/{props.month}/{props.year}
          </Typography>
        ) : (
          <Typography gutterBottom variant="h4" component="div">{props.day}/{props.month}/{props.year}</Typography>
        )}

        <div>
        {props.event.length === 0 && (
            <Typography variant="subtitle2" component="div">
              No event for this day
            </Typography>
          )}
          {props.event &&
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
                {/* {<List>
                  <ListItem disablePadding>
                    <ListItemButton key={index} onClick={handleOpen}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={event.title} />
                    </ListItemButton>
                  </ListItem>
                </List>} */}
                {/* // <Typography variant="body2" gutterBottom key={index} onClick={handleOpen}>
                //   {event.title}
                // </Typography> */}
                {/* {isPopupOpen &&(
                <DashboardPopup
                  renderType="day-events"
                  events={event}
                  handleClose={handleClose}
                  year={props.year}
                  month={props.month}
                  day={props.day}
                />
                )} */}
                </div>
              );
            })}
        </div>
        {/* {isPopupOpen && (
          <DashboardPopup
            renderType="day-events"
            events={props.event}
            handleClose={handleClose}
            year={props.year}
            month={props.month}
            day={props.day}
          />
        )} */}
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;