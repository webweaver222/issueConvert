import React, { useEffect, useState } from "react";
import Main from "../Main";
import BGC from "./background";
import "resources/reset.scss";
import "resources/main.scss";
import "./app.scss";

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {}, []);

  return (
    <div className="app">
      <Main />
      <BGC />
    </div>
  );
};

export default App;
