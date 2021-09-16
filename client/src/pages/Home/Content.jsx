import React from "react";
import Account from "../Account";
import Calendar from "../Calendar";
import Contact from "../Contact";
import Dashboard from "../Dashboard";
function Content(props) {
  return (
    <React.Fragment>
      {props.page === "account" && <Account />}
      {props.page === "calendar" && <Calendar />}
      {props.page === "contact" && <Contact />}
      {props.page === "dashboard" && <Dashboard />}
    </React.Fragment>
  );
}

export default Content;
