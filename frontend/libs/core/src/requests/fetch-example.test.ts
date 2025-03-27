import { fetchExample, fetchExampleType } from './fetch-example';

globalThis.fetch = jest.fn();

describe('fetchExample', () => {
  it('should fetch data and return the expected object', async () => {
    const mockResponse: fetchExampleType = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    };

    // Mock fetch response
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchExample();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
    expect(result).toEqual(mockResponse);
  });

  it('should handle fetch errors', async () => {
    (globalThis.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    await expect(fetchExample()).rejects.toThrow('Failed to fetch');
  });
});
