import React from "react";

import DashboardDay from "./DashboardDay";

function DashboardDays(props) {
  let firstDay = new Date(props.year, props.month, 1);
  console.log(firstDay);

  let today = new Date().getDate();
  console.log(today);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  let daysInMonth = getDaysInMonth(new Date(props.year, props.month));
  console.log(daysInMonth)


  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  var result = range(today, daysInMonth);
  console.log(result);


  return (
    <div>
        {/* [...Array(firstDay.getDay())] */}
      {/* {result.map((day, index) => {
        return <DashboardDay day="" key={`a${index}`} />;
      })} */}
      {result.length>4 && result.slice(0,4).map((day, index) => {
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day]}
            key={index}
          />
        );
      })}
      {result.length<=4 && result.map((day, index) => {
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day]}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default DashboardDays;