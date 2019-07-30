const ContentSecurityPolicy =
  // CSP
  `default-src 'self' 'unsafe-inline' https://lex-land.cloud https://unpkg.com`;
const DevContentSecurityPolicy =
  // CSP
  `default-src 'self' 'unsafe-inline' localhost:3001 https://lex-land.cloud https://unpkg.com`;

export const CSP =
  process.env.NODE_ENV === 'production'
    ? ContentSecurityPolicy
    : DevContentSecurityPolicy;
