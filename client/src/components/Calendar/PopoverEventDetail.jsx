import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function PopoverEventDetail(props) {
  return (
    <React.Fragment>
      <div>
        {props.events &&
          props.events.map((event) => {
            return (
              <div className="event-detail">
                <p>
                  {event.time} {event.title}
                </p>
                <p>{event.description}</p>
                <p>{event.people.toString()}</p>
              </div>
            );
          })}
      </div>

      <Button variant="outlined" color="primary" onClick={props.toggleAddEvent}>
        + New Event
      </Button>
    </React.Fragment>
  );
}

export default PopoverEventDetail;
