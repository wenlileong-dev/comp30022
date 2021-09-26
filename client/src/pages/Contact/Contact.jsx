import ReactDOM from "react-dom";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
//import Accordion from 'react-bootstrap/Accordion';

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

import Popover from "@mui/material/Popover";
import axios from "axios";
import NoteTimeline from "../../components/Group/NoteTimeline";
import DisplayGroup from "../../components/Group/DisplayGroup";
import AddContactLink from "./index";
import { useState, useEffect } from "react";

import GroupTitle from "../../components/Group/GroupTitle";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Contact() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // fetch group infomaiton
  const [groups, getGroups] = useState("");

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = () => {
    axios
      .get(`/group`)
      .then((response) => {
        const allGroups = response.data.allGroups;
        getGroups(allGroups);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  //group list and contact list
  // const [groupName, getGroupName] = useState([]);
  const [contacts, getContacts] = useState([]);

  // useEffect(() => {
  //   getAllGroupName();
  // }, []);

  // const getAllGroupName = () => {
  //   axios
  //     .get(`/group`)
  //     .then((response) => {
  //       const allGroups = response.data.allGroups;
  //       const groupname = [];
  //       allGroups.map((eachGroup,index) => {
  //         groupname.push(eachGroup.groupName);
  //       })
  //       getGroupName(groupname);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };
  // console.log(groupName);
  // console.log("groupN");


  useEffect(() => {
    getAllContactName();
  }, []);

  const getAllContactName = () => {
    axios
      .get(`/group`)
      .then((response) => {   
        const allGroups = response.data.allGroups;
        const contactName = [];
        console.log(contactName);
        allGroups.map((eachGroup, index) => {
          contactName.push([]);
          console.log(contactName);
          eachGroup.contacts.map((eachContact,i) => {
            // console.log("each contact");
            // console.log(eachContact);
            return axios
                     .get(`/api/contacts/info/${eachContact}`)
                     .then((response) => {
                      console.log(eachContact);
                      //console.log(index);
                      console.log(contactName);
                      console.log(contactName[index]);
                      contactName[index].push(response.data.info.firstName + " " + response.data.info.lastName);
                     })
          })
        })
        console.log(contactName);
        getContacts(contactName);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  
  // console.log("contactN");
  console.log(contacts);
  console.log(groups);
  



  return (
    <div>
      <GroupTitle/>
      <AddContactLink />
      {/* <DisplayGroup groups={groups}/> */}

      
      <DisplayGroup groups={groups} contacts={contacts}/>
      {/* {groupName.map((group,index) => {
        return (
          <DisplayGroup groupnames={groupName[index]}/>
        )
      })} */}

    </div>
  );
}


export default Contact;
