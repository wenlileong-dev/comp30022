import React, { useState } from "react";
import PopoverEventDetail from "./DashboardEventDetail";
import DashboardEditEvent from "./DashboardEditEvent";
function DashboardPopup(props) {
  // let [isOpen, setIsOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(props.renderType);
  let [eventDetail, setEventDetail] = useState({});
  // function toggleOpen() {
  //   setIsOpen(!isOpen);
  // }

  function oepnEventDetail() {
    setIsOpen("event-detail");
  }

  return (
    <React.Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {isOpen === "day-events" && (
            <PopoverEventDetail
              events={props.events}
              setEventDetail={setEventDetail}
              toggleEditEvent={oepnEventDetail}
            />
            )}
            {isOpen === "event-detail" && (
            <DashboardEditEvent eventDetail={eventDetail} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default DashboardPopup;