import React from "react";
import ReactDOM from "react-dom";
import GlobalStyled from "./assets/globalStyled";
import Routers from "./Routers";
import './config/bootstrap'

ReactDOM.render(
  <React.StrictMode>
    <Routers />
    <GlobalStyled />
  </React.StrictMode>,
  document.getElementById("root")
);
