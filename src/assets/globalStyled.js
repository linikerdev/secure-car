import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  *{
      margin:0;
      padding:0;
      outline:none;
      font-family: 'Roboto', sans-serif;
  }
  body,
  #root{
        height: 100vh;
        background-image: linear-gradient(#fff, #F3F3F3);
        flex: 1;
  }

`;
export default GlobalStyle;
