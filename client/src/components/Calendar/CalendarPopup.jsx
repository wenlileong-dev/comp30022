import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import PopoverEventDetail from "./PopoverEventDetail";
import PopoverAddEvent from "./PopoverAddEvent";
import PopoverEditEvent from "./PopoverEditEvent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "70%",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CalendarPopup(props) {
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
      <Modal
        open={props.isPopupOpen}
        onClose={props.handleClose}
        data-testid="modal-popup"
        data-cy="modal-popup"
      >
        <Box sx={style}>
          {isOpen === "day-events" && (
            <PopoverEventDetail
              events={props.events}
              setEventDetail={setEventDetail}
              toggleEditEvent={oepnEventDetail}
              handleClose={props.handleClose}
            />
          )}
          {isOpen === "new-event" && (
            <PopoverAddEvent
              year={props.year}
              month={props.month}
              day={props.day}
              fetchData={props.fetchData}
              handleClose={props.handleClose}
            />
          )}
          {isOpen === "event-detail" && (
            <PopoverEditEvent
              eventDetail={eventDetail}
              handleClose={props.handleClose}
              fetchData={props.fetchData}
            />
          )}
          {isOpen === "mobile-event-detail" && (
            <PopoverEditEvent
              eventDetail={props.eventDetail}
              handleClose={props.handleClose}
              fetchData={props.fetchData}
            />
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default CalendarPopup;
