import { createGlobalStyle } from 'styled-components';
// import { media } from './theme';
const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scroll-behavior: smooth;

  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.black};
    font-size: 1.6rem;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .text-center {
    text-align: center;
    p &,
    span & {
      margin-left: auto;
      margin-right: auto;
      display: inline-block;
    }
  }
  span.text-center {
    display: block;
    text-align: center;
  }
`;

export default GlobalStyle;
