import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 :root {
  --color-figure-1: #7c5dfa;
  --color-figure-2: #9277ff;
  --color-figure-3: #7E88C3;
  --color-white-bg: #f2f2f2;
  --color-3: #1e2139;
  --color-4: #494e6e;
  --color-gray-2: #888eb0;
  --color-sidebar: #252945;
  --color-font: #0c0e16;
  --font-main: "Spartan", sans-serif;
  --transition: 0.1s all ease-in-out;
  --transitionSlow: 0.25s all ease-in-out;
  --theme: ${({ theme }) => theme.bg};
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-size: 18px;
  position: relative;
  color: var(--color-font);
  font-family: var(--font-main);
  transition: background 0.3s ease-in-out;
  background: ${({ theme }) => theme.bg};
}
`;

export default GlobalStyle;
