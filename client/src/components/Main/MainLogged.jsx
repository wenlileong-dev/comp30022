import React, { useState } from "react";
import axios from "axios";
import AuthPopout from "./../Popout/AuthPopout";
function MainLogged(props) {
  const handleLogout = async () => {
    axios.get(`/api/auth/logout`).then((res) => {
      //   console.log(res);
      console.log(res.data);
      window.location.href = "/";
    });
  };
  return (
    <div>
      <p>{props.user.username}</p>
      <p>
        Work-Play ratio {props.user.workRatio} : {props.user.playRatio}
      </p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default MainLogged;
