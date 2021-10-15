import React, { useState } from "react";
import Typography from "@mui/material/Typography";
// import { Divider } from 'antd';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { indigo } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DashboardPopup from "./DashboardPopup";
import { Link, Route } from "react-router-dom";
function DashboardDay(props) {
  let [isPopupOpen, setIsPopupOpen] = useState(false);
  let [isShowOne, setIsShowOne] = useState(false);

  function handleOpen(event) {
    setIsPopupOpen(true);
    // setIsShowOne(true);
  }
  function handleShow(event) {
    setIsShowOne(true);
  }
  function handleClose(event) {
    event.stopPropagation();
    setIsPopupOpen(false);
    setIsShowOne(false);
  }
  console.log(props.firstName);
  return (
    <React.Fragment>
      <div>
        <Link
          to={{ pathname: `/contact/info`, state: { contact: props.contacts } }}
        >
          <Typography variant="subtitle1" gutterBottom component="div" mt={2}>
            {props.contacts.firstName} {props.contacts.lastName}
          </Typography>
        </Link>
        <Divider />
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;
