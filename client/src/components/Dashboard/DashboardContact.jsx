import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
function DashboardDay(props) {
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
