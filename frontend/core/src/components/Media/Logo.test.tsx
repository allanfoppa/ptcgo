import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Logo } from './Logo';

// Since Jest doesn't understand image imports (.png files), we need to mock them.
jest.mock('../../assets/images/logo.png', () => 'mocked-logo.png');

describe('Logo Component', () => {
  it('renders the logo image correctly', () => {
    render(<Logo />);
    const logoImage = screen.getByTestId('logo');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'mocked-logo.png');
    expect(logoImage).toHaveAttribute('alt', 'PTCGO Logo');
  });

  it('applies the extraClass prop to the img element', () => {
    const extraClass = 'custom-class';
    render(<Logo extraClass={extraClass} />);
    const logoImage = screen.getByTestId('logo');

    expect(logoImage).toHaveClass(extraClass);
  });
});
