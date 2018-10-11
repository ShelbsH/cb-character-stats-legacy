import React from "react";
import ReactDOM from "react-dom";
import App from "app/components/app";
import "styles/app.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
