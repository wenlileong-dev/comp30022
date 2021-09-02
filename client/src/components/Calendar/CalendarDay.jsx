import React from "react";

function CalendarDay(props) {
  return (
    <div className="calendar-day">
      {props.day}
      <div>
        {props.event &&
          props.event.map((event) => {
            return (
              <p className="calendar-event">
                {event.time} {event.title}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default CalendarDay;
