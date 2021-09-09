import React from "react";
import Main from "../Main";
import BGC from "./background";

import "resources/reset.scss";
import "resources/main.scss";

import Auth from "../Auth";

const App = () => {
  return (
    <div className="app">
      {false && <Main />}
      <Auth />
      <BGC />
    </div>
  );
};

export default App;
