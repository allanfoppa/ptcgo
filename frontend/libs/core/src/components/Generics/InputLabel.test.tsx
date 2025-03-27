import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InputLabel } from './InputLabel';

describe('InputLabel Component', () => {
  it('renders the label correctly', () => {

    const props = {
      label: 'Test Label',
      labelFor: 'test-input',
    };

    render(<InputLabel label={props.label} labelFor={props.labelFor} />);
    const inputLabel = screen.getByText(props.label);

    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel).toHaveAttribute('for', props.labelFor);
  });
});
