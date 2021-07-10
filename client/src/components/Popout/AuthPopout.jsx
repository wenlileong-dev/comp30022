import React from "react";
import { Link } from "react-router-dom";
require("./Popout.css");

function AuthPopout(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div>
          <p>{props.authMsg.msg}</p>
          <p>
            {props.authMsg.status === 200 ? (
              <Link to="/home">Home</Link>
            ) : (
              <Link to="/login">Try Again</Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPopout;
