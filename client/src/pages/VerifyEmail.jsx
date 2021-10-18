import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  let { userID, emailToken } = useParams();
  const [message, setMessage] = useState("");
  const verifyEmail = async () => {
    let result = await axios.put(`/user/api/verify/${userID}/${emailToken}`);
    setMessage(result.data.message);
    if (result.data.status === 200) {
      window.location = "/user";
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <React.Fragment>
      <p>Verifying your email...</p>
      <p>{message}</p>
    </React.Fragment>
  );
}
export default VerifyEmail;
