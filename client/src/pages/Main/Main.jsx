import React, { useState, useEffect } from "react";
import axios from "axios";

import MainNotLogged from "../../components/Main/MainNotLogged";
import MainLogged from "../../components/Main/MainLogged";

function Main(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/main`);
      console.log(result.data);
      setUser(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {user.status === 200 ? (
        user && <MainLogged user={user.data} />
      ) : (
        <MainNotLogged />
      )}
    </div>
  );
}

export default Main;
