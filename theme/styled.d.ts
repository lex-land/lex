// import original module declarations
import 'styled-components';
import { LexTheme } from './lex-theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends LexTheme {
    defaultBodyBackground: string;
  }
}
