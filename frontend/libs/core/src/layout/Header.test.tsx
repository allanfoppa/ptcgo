import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from './Header';

describe('Header component', () => {
  test('renders the Header component', () => {
    // ARRANGE
    render(<Header />);

    // ASSERT
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
