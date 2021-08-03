import React from "react";
import Main from "../Main";
import BGC from "./background";
import "resources/reset.scss";
import "resources/main.scss";
import "./app.scss";

const App = () => {
  return (
    <div className="app">
      <Main />
      <BGC />
    </div>
  );
};

export default App;
