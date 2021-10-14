import React, { useState } from 'react';
import PopoverSearch from "./PopoverSearch";

function SearchPopUp(props) {

    let [isOpen, setIsOpen] = useState(props.renderType);
    let [eventDetail, setEventDetail] = useState({});
    
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
            
            {isOpen === "search" && (
              <PopoverSearch/>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
  
  export default SearchPopUp;