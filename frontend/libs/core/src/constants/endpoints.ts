const baseURl = process.env.PUBLIC_API_BASE_URL;

export const ENDPOINT_AUTHENTICATION = `${baseURl}/authentication`;
export const ENDPOINT_REGISTRATION = `${baseURl}/registration`;
export const ENDPOINT_DECKS = ({id}: {id: string}) => `${baseURl}/decks/${id}`;
