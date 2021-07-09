import React from "react";
import { Link } from "react-router-dom";
function MainNotLogged(props) {
  return (
    <div>
      <p>You are not login</p>
      <p>Please login or signup to use the app</p>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default MainNotLogged;
