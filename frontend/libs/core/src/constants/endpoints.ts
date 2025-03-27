const baseURl = process.env.PUBLIC_API_BASE_URL;

export const ENDPOINT = Object.freeze({
  REGISTRATION: `${baseURl}/registration`,
  AUTHENTICATION: `${baseURl}/authentication`,
});
