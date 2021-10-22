import React from "react";
import DashboardContact from "./DashboardContact";
function DashboardContacts(props) {
  return (
    <div>
      {props.contacts.slice(0,4).map((contact, index) => {
        return <DashboardContact contacts={contact} key={index} />;
      })}
    </div>
  );
}

export default DashboardContacts;
