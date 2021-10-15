import React from "react";

import DashboardContact from "./DashboardContact";

function DashboardContacts(props) {
  //   let firstDay = new Date(props.year, props.month, 1);
  console.log(props);

  //   let today = new Date().getDate();
  //   console.log(today);

  //   const getDaysInMonth = (date) => {
  //     return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  //   };
  //   let daysInMonth = getDaysInMonth(new Date(props.year, props.month));
  //   console.log(daysInMonth)

  //   function range(start, end) {
  //     return Array(end - start + 1).fill().map((_, idx) => start + idx)
  //   }
  //   var result = range(today, daysInMonth);
  //   console.log(result);

  return (
    <div>
      {props.contacts.map((contact, index) => {
        return <DashboardContact contacts={contact} key={index} />;
      })}
    </div>
  );
}

export default DashboardContacts;
