import React from "react";
import DashboardContact from "./DashboardContact";
function DashboardContacts(props) {
  return (
    <div>
      {props.contacts.map((contact, index) => {
        return (
          <DashboardContact
            contacts={contact}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default DashboardContacts;
