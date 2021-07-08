import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const [template, setTemplate] = useState({ title: "", description: "" });

  function handleChange(event) {
    let { name, value } = event.target;

    if (name === "title") {
      setTemplate((prevValue) => {
        return {
          title: value,
          description: prevValue.description,
        };
      });
    } else if (name === "description") {
      setTemplate((prevValue) => {
        return {
          title: prevValue.title,
          description: value,
        };
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`/api`, template).then((res) => {
      console.log(res);
      console.log(res.data);
      setTemplate({ title: "", description: "" });
      window.location.href = `/home`;
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={template.title}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={template.description}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
