import React from "react";
import { Link } from "react-router-dom";
require("./Popout.css");

function AuthPopout(props) {
  const directLogin = () => {
    window.location.href = "/login";
  };
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
              <Link to="/">Home</Link>
            ) : (
              <button type="button" onClick={directLogin}>
                Try Again
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPopout;
