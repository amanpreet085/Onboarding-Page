import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './index';

describe('InputField Component', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'testInput',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  test('renders without errors', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays label when provided', () => {
    const label = 'Test Label';
    render(<InputField {...defaultProps} label={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('shows error message when showError is true', () => {
    const errorMessage = 'This field is required';
    render(<InputField {...defaultProps} error={errorMessage} showError={true} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('calls onChange handler when value changes', () => {
    render(<InputField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('calls onBlur handler when input loses focus', () => {
    render(<InputField {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test('displays validation spinner when isValidating is true', () => {
    render(<InputField {...defaultProps} isValidating={true} />);
    expect(screen.getByTestId('validation-spinner')).toBeInTheDocument();
  });

  test('applies error class when showError is true', () => {
    render(<InputField {...defaultProps} error="Error" showError={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-error');
  });

  test('respects maxLength property', () => {
    const maxLength = 5;
    render(<InputField {...defaultProps} maxLength={maxLength} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', maxLength.toString());
  });
});