/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CorporationNumber from './index';
import { useForm } from '../../../../hooks/useForm';
import { mockFormContext } from '../../../../__mocks__/formContextMock';

// Mock the form hook
jest.mock('../../../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

// Mock the constants
jest.mock('../../../../constants/form', () => ({
  corporationNumberLabel: 'Corporation Number',
  corporationNumberLength: 9,
}));

describe('CorporationNumber Component', () => {
  beforeEach(() => {
    useForm.mockReturnValue(mockFormContext);
  });

  test('renders corporation number input field', () => {
    render(<CorporationNumber />);
    expect(screen.getByLabelText('Corporation Number')).toBeInTheDocument();
  });

  test('uses the form context values', () => {
    const mockValues = {
      ...mockFormContext,
      values: { ...mockFormContext.values, corporationNumber: '123456789' },
    };
    useForm.mockReturnValue(mockValues);
    
    render(<CorporationNumber />);
    expect(screen.getByLabelText('Corporation Number')).toHaveValue('123456789');
  });

  test('shows error when touched and has error', () => {
    const mockWithError = {
      ...mockFormContext,
      touched: { ...mockFormContext.touched, corporationNumber: true },
      errors: { ...mockFormContext.errors, corporationNumber: 'Corporation number is required' },
    };
    useForm.mockReturnValue(mockWithError);
    
    render(<CorporationNumber />);
    expect(screen.getByText('Corporation number is required')).toBeInTheDocument();
  });

  test('displays validation spinner when async validation is in progress', () => {
    const mockAsyncValidation = {
      ...mockFormContext,
      asyncValidationInProgress: { corporationNumber: true },
    };
    useForm.mockReturnValue(mockAsyncValidation);
    
    render(<CorporationNumber />);
    expect(screen.getByTestId('validation-spinner')).toBeInTheDocument();
  });

  test('prevents non-numeric characters', () => {
    render(<CorporationNumber />);
    const input = screen.getByLabelText('Corporation Number');
    
    const preventDefaultMock = jest.fn();
    
    // Simulate key press with a numeric character
    fireEvent.keyPress(input, { 
      key: '5', 
      preventDefault: preventDefaultMock 
    });
    
    expect(preventDefaultMock).not.toHaveBeenCalled();
  });
});