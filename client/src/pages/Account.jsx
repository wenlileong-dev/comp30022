import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function Account() {
  const logoutUser = async () => {
    let result = await axios.post("/user/logout");
    if (result.data.status !== 200) {
      alert(result.data.errorMsg);
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <React.Fragment>
      <p>Account Page</p>
      <Button variant="contained" onClick={logoutUser}>
        Logout
      </Button>
    </React.Fragment>
  );
}

export default Account;
