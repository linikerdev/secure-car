import React from "react";
import ReactDOM from "react-dom";
import GlobalStyled from "./assets/globalStyled";
import Routers from "./Routers";
import './config/bootstrap'


document.title = 'Secure Car - Infnet'

ReactDOM.render(
  <React.Fragment>
    <Routers />
    <GlobalStyled />
  </React.Fragment>,
  document.getElementById("root")
);
