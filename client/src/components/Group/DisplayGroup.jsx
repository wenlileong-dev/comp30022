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
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GroupFooter from "./GroupFooter";
import GroupComponent from "./GroupComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

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

export default function DisplayGroup(props) {
  // const [expanded, setExpanded] = React.useState("panel1");

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const renderDeleteButton = (id) => {
    if (id != "614feba57ed1181a1837746d"){
      return <GroupFooter groupID = {id}/>
    }
  }

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.group.groupName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.contacts &&
            props.contacts.map((contact) => {
              return <GroupComponent contact={contact} key={contact._id}/>;
            })}
          {renderDeleteButton(props.group._id)}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );

  // fetch contact name

  // const displayNotes = (props) => {
  //   const renderDeleteButton = (id) => {
  //     if (id != "614feba57ed1181a1837746d"){
  //       return <GroupFooter groupID = {id}/>
  //     }
  //   }

  //   if (props.groups?.length > 0) {

  //     return (
  //       props.groups && 
  //       props.groups.map((group, index) => {
  //       return (
  //         <Accordion
  //           key = "{index}"
  //           expanded={expanded === "panel" + index}
  //           onChange={handleChange("panel" + index)}
  //         >
  //           <AccordionSummary
  //             aria-controls="panel1d-content"
  //             id="panel1d-header"
  //           >
  //             <Typography>{group.groupName}</Typography>
  //           </AccordionSummary>
  //           <AccordionDetails>
  //             <List
  //               sx={{
  //                 width: "100%",
  //                 maxWidth: 360,
  //                 bgcolor: "background.paper",
  //               }}
  //             >
                
  //               {
  //                 props.contacts[index] &&
  //                 props.contacts[index].map((contact,i) => {
  //                   return (
  //                     <div>
  //                       <ListItem>
  //                         <ListItemAvatar>
  //                           <Avatar>
  //                             <ImageIcon />
  //                           </Avatar>
  //                         </ListItemAvatar>
  //                         <ListItemText primary={contact} key={i} />
  //                       </ListItem>
  //                       <Divider variant="inset" component="li"/>
  //                     </div>
  //                   )
                    
                    
  //                 }
  //                 )
  //               }
  //             </List>
  //             {renderDeleteButton(group._id)}
  //             {/* <GroupFooter groupID = {group._id}/> */}
  //           </AccordionDetails>
  //         </Accordion>
  //       );
  //     }))
  //   } else {
  //     return <h3>No group yet</h3>;
  //   }
  // };
  //return <>{displayNotes(props)}</>;
}
