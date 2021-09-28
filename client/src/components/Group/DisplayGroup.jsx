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
import TopGroup from "./TopGroup";
import GroupComponent from "./GroupComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AccordionActions } from "@mui/material";


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

  const renderDeleteButton = (id) => {
    if (id != "614feba57ed1181a1837746d") {
      return (
        <div style={{ position: 'relative' ,right:'10px',top:'50px'}}>
          <GroupFooter groupID={id} />
        </div>
        // <>
        //   <div style={{ position: 'absolute' ,right:'10px',top:'4px'}}>
        //     <GroupFooter groupID={id} />
        //   </div>
        //   <GroupFooter groupID={id} />
        // </>
      )
    }
  }

  const renderTwoButton = (id) => {
    if (id != "614feba57ed1181a1837746d") {
      return (
        <>
          <div style={{ position: 'absolute' ,right:'50px',top:'4px'}}>
            <TopGroup groupID={props.group._id} groupTop={props.group.isTop} />
          </div>

          <div style={{ position: 'absolute' ,right:'10px',top:'4px'}}>
            <GroupFooter groupID={id} />
          </div>
        </>
        
      )
    }else {
      return (
        <div style={{ position: 'absolute' ,right:'10px',top:'4px'}}>
            <TopGroup groupID={props.group._id} groupTop={props.group.isTop} />
        </div>
      )
      
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

          {/* <Button
           size="small" 
           onClick={topGroup}
           id="top-group"
           >
             highlight
          </Button> */}
          {renderTwoButton(props.group._id)}

          {/* <div style={{ position: 'absolute' ,right:'10px',top:'4px'}}>
            <TopGroup groupID={props.group._id} groupTop={props.group.isTop} />
          </div> */}

        </AccordionSummary>
        <AccordionDetails>

          {props.contacts &&
            props.contacts.map((contact, index) => {
              // console.log(contact._id);
              // console.log("open");
              return <GroupComponent contact={contact} contactId={contact._id} key={contact._id + index} />;
            })}
          {/* {renderDeleteButton(props.group._id)} */}
        </AccordionDetails>

        {/* <Divider/>
        <AccordionActions>
          {renderDeleteButton(props.group._id)}
        </AccordionActions> */}

      </Accordion>
    </React.Fragment>
  );
}
