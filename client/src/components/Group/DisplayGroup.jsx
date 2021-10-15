import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import GroupFooter from "./GroupFooter";
import TopGroup from "./TopGroup";
import GroupComponent from "./GroupComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  // highlight button and delete button
  const renderTwoButton = (group) => {
    if (!group.isDefault) {
      return (
        <>
          <div style={{ position: "absolute", right: "50px", top: "4px" }}>
            <TopGroup
              groupID={props.group._id}
              groupTop={props.group.isTop}
              getGroupContacts={props.getGroupContacts}
            />
          </div>

          <div style={{ position: "absolute", right: "10px", top: "4px" }}>
            <GroupFooter
              groupID={group._id}
              getGroupContacts={props.getGroupContacts}
            />
          </div>
        </>
      );
    } else {
      return (
        <div style={{ position: "absolute", right: "10px", top: "4px" }}>
          <TopGroup
            groupID={props.group._id}
            groupTop={props.group.isTop}
            getGroupContacts={props.getGroupContacts}
          />
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.group.groupName}</Typography>
          {renderTwoButton(props.group)}
        </AccordionSummary>
        <AccordionDetails>
          {props.contacts &&
            props.contacts.map((contact, index) => {
              return (
                <GroupComponent
                  contact={contact}
                  contactId={contact._id}
                  key={contact._id + index}
                />
              );
            })}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
