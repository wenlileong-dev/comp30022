import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api`);
      console.log(result.data.data);
      setText(result.data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <p>{text}</p>
    </div>
  );
}

export default App;
