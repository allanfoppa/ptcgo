import { ENDPOINT } from './endpoints';

describe('ENDPOINT constants', () => {
  const baseURl = process.env.PUBLIC_API_BASE_URL;

  it('should have the correct registration endpoint', () => {
    expect(ENDPOINT.REGISTRATION).toBe(`${baseURl}/registration`);
  });

  it('should have the correct authentication endpoint', () => {
    expect(ENDPOINT.AUTHENTICATION).toBe(`${baseURl}/authentication`);
  });
});
