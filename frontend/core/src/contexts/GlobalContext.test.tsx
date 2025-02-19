import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { GlobalContext, GlobalProvider } from './GlobalContext';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

// Create a test component that consumes the context
const TestComponent = () => {
  const { loading, setLoading, text, setText } = useContext(GlobalContext);

  return (
    <div>
      <p data-testid="loading">Loading: {loading ? 'true' : 'false'}</p>
      <p data-testid="text">Text: {text}</p>
      <button onClick={() => setLoading(true)}>Set Loading</button>
      <button onClick={() => setText('Hello World')}>Set Text</button>
    </div>
  );
};

describe('GlobalProvider', () => {
  test('provides default context values', () => {
    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading: false');
    expect(screen.getByTestId('text')).toHaveTextContent('Text:');
  });

  test('updates context values when functions are called', () => {
    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    // Click the button to update loading state
    fireEvent.click(screen.getByText('Set Loading'));
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading: true');

    // Click the button to update text state
    fireEvent.click(screen.getByText('Set Text'));
    expect(screen.getByTestId('text')).toHaveTextContent('Text: Hello World');
  });
});
