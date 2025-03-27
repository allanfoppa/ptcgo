import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlaceholderText, PlaceholderImage } from './Placeholder';

// Since Jest doesn't understand image imports (.webp files), we need to mock them.
jest.mock('../../assets/images/placeholder-image.webp', () => 'mocked-logo.webp');

describe('PlaceholderText', () => {
  it('renders the placeholder text correctly', () => {

    render(<PlaceholderText />);
    const placeholderText = screen.getByTestId('placeholder-text');

    expect(placeholderText).toBeInTheDocument();
  });
});

describe('PlaceholderImage', () => {
  it('renders the placeholder image', () => {
    render(<PlaceholderImage />);
    const placeholderImage = screen.getByTestId('placeholder-image');

    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderImage).toHaveAttribute('src', 'mocked-logo.webp');
    expect(placeholderImage).toHaveAttribute('alt', 'Asset not loaded');
  });
});
