import React from "react";
import PopoverAddGroup from "./PopoverAddGroup";


function GroupPopup(props) {

  // let [isOpen, setIsOpen] = useState(props.renderType);
  let isOpen=props.renderType;
  // let [eventDetail, setEventDetail] = useState({});
  
  // function oepnEventDetail() {
  //   setIsOpen("event-detail");
  // }

  return (
    <React.Fragment>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          
          {isOpen === "new-group" && (
            <PopoverAddGroup
              year={props.year}
              month={props.month}
              day={props.day}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default GroupPopup;
