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
        {/* <p>1</p> */}
        {/* [...Array(firstDay.getDay())] */}
      {/* {result.map((day, index) => {
        return <DashboardDay day="" key={`a${index}`} />;
      })} */}
      {props.contacts.map((contact, index) => {
        console.log(contact)
        return (
          <DashboardContact
            contacts={contact}
            key={index}
          />
        );
      })}
      {/* {result.length<=4 && result.map((day, index) => {
        console.log(props.events[day])
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
        );
      })} */}
    </div>
  );
}

export default DashboardContacts;