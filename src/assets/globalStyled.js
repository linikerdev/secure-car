import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  *{
      margin:0;
      padding:0;
      outline:none;
  }
  body,
  #root{
        height: 100vh;
  }

`;
export default GlobalStyle;