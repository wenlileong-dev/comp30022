import React from "react";
import Account from "../../pages/Account";
import Calendar from "../../pages/Calendar";
import Contact from "../../pages/Contact";
import Dashboard from "../../pages/Dashboard";
function NavigationContent(props) {
  return (
    <React.Fragment>
      {props.page === "account" && <Account />}
      {props.page === "calendar" && <Calendar />}
      {props.page === "contact" && <Contact />}
      {props.page === "dashboard" && <Dashboard />}
    </React.Fragment>
  );
}

export default NavigationContent;
