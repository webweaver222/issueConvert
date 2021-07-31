import React, { useEffect, useState } from "react";
//import { Route, Switch } from "react-router-dom";
import "resources/main.scss";
import "./app.scss";

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("alex");
  }, []);

  return (
    <div className="app">
      <h1>Hellow {name} !</h1>;
    </div>
  );
};

export default App;
