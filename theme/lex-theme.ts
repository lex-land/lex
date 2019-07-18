import { createGlobalStyle } from 'styled-components';

// my-theme.ts
const lexTheme = {
  borderRadius: '5px',
  defaultBodyBackground: '#f5f8fa',
  colors: {
    main: '#106ba3',
    secondary: 'rgba(0,0,0,0.45)',
  },
};

export const GlobalStyle = createGlobalStyle<{ backgroundColor?: string }>`
  body {
    background:${props =>
      props.backgroundColor || lexTheme.defaultBodyBackground};
  }
`;

// https://www.styled-components.com/docs/tooling#styled-theming

export type LexTheme = typeof lexTheme;
export { lexTheme };
