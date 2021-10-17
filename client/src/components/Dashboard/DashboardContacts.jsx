import React from "react";

import DashboardContact from "./DashboardContact";

function DashboardContacts(props) {
  // console.log(props);
  return (
    <div>
      {props.contacts.map((contact, index) => {
        // console.log(contact)
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