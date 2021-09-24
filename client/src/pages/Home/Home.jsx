import React, { useState, useEffect } from "react";
import axios from "axios";

import InputForm from "./../../components/InputForm";
import Template from "./../../components/Template";

function Home() {
  const [templates, setTemplate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api`);
      console.log(result.data.data);
      setTemplate(result.data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <InputForm />
      {templates &&
        templates.map((template) => {
          return (
            <Template
              key={template._id}
              title={template.title}
              description={template.description}
            />
          );
        })}
    </div>
  );
}

export default Home;
