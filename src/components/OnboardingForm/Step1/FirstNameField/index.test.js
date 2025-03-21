/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, screen } from '@testing-library/react';
import FirstName from './index';
import { useForm } from '../../../../hooks/useForm';
import { mockFormContext } from '../../../../__mocks__/formContextMock';

// Mock the form hook
jest.mock('../../../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

// Mock the constants
jest.mock('../../../../constants/form', () => ({
  firstNameLabel: 'First Name',
  firstNameMaxLength: 50,
}));

describe('FirstName Component', () => {
  beforeEach(() => {
    useForm.mockReturnValue(mockFormContext);
  });

  test('renders first name input field', () => {
    render(<FirstName />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  });

  test('uses the form context values', () => {
    const mockValues = {
      ...mockFormContext,
      values: { ...mockFormContext.values, firstName: 'John' },
    };
    useForm.mockReturnValue(mockValues);
    
    render(<FirstName />);
    expect(screen.getByLabelText('First Name')).toHaveValue('John');
  });

  test('shows error when touched and has error', () => {
    const mockWithError = {
      ...mockFormContext,
      touched: { ...mockFormContext.touched, firstName: true },
      errors: { ...mockFormContext.errors, firstName: 'First name is required' },
    };
    useForm.mockReturnValue(mockWithError);
    
    render(<FirstName />);
    expect(screen.getByText('First name is required')).toBeInTheDocument();
  });
});