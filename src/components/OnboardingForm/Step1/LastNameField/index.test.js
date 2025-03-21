/* eslint-disable jest/no-mocks-import */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LastName from './index';
import { useForm } from '../../../../hooks/useForm';
import { mockFormContext } from '../../../../__mocks__/formContextMock';

// Mock the form hook
jest.mock('../../../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

// Mock the constants
jest.mock('../../../../constants/form', () => ({
  lastNameLabel: 'Last Name',
  lastNameMaxLength: 50,
}));

describe('LastName Component', () => {
  beforeEach(() => {
    useForm.mockReturnValue(mockFormContext);
  });

  test('renders last name input field', () => {
    render(<LastName />);
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  test('uses the form context values', () => {
    const mockValues = {
      ...mockFormContext,
      values: { ...mockFormContext.values, lastName: 'Doe' },
    };
    useForm.mockReturnValue(mockValues);
    
    render(<LastName />);
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
  });

  test('shows error when touched and has error', () => {
    const mockWithError = {
      ...mockFormContext,
      touched: { ...mockFormContext.touched, lastName: true },
      errors: { ...mockFormContext.errors, lastName: 'Last name is required' },
    };
    useForm.mockReturnValue(mockWithError);
    
    render(<LastName />);
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
  });
});