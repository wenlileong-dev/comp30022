import React from "react";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
function DashboardDay(props) {
  return (
    <React.Fragment>
      <div>
      <Link
                
                to={{pathname:`/contact/info`,
                state:{contact:props.contacts}}}
            >
            {props.contacts.firstName} {props.contacts.lastName}
          </Link>
          <Divider/>
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;
