declare module '*.json' {
  const value: {
    "companyName": string,
    "allowedDomains": string[],
    "urlApi": string,
    "disallowedRoutes": string[]
  };
  export default value;
}
