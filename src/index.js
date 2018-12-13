import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./Welcome";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Welcome name="Afsana" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
