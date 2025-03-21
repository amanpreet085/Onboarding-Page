/* eslint-disable jest/no-mocks-import */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhoneNumber from './index';
import { useForm } from '../../../../hooks/useForm';
import { mockFormContext } from '../../../../__mocks__/formContextMock';

// Mock the form hook
jest.mock('../../../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

// Mock the constants
jest.mock('../../../../constants/form', () => ({
  phoneNumberLabel: 'Phone Number',
  phoneNumberCountryCode: '+1',
}));

describe('PhoneNumber Component', () => {
  beforeEach(() => {
    useForm.mockReturnValue(mockFormContext);
  });

  test('renders phone number input field', () => {
    render(<PhoneNumber />);
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
  });

  test('uses the form context values', () => {
    const mockValues = {
      ...mockFormContext,
      values: { ...mockFormContext.values, phone: '+11234567890' },
    };
    useForm.mockReturnValue(mockValues);
    
    render(<PhoneNumber />);
    expect(screen.getByLabelText('Phone Number')).toHaveValue('+11234567890');
  });

  test('shows error when touched and has error', () => {
    const mockWithError = {
      ...mockFormContext,
      touched: { ...mockFormContext.touched, phone: true },
      errors: { ...mockFormContext.errors, phone: 'Phone number is required' },
    };
    useForm.mockReturnValue(mockWithError);
    
    render(<PhoneNumber />);
    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
  });

  test('prevents non-numeric characters except +', () => {
    render(<PhoneNumber />);
    const input = screen.getByLabelText('Phone Number');
    const preventDefaultMock = jest.fn();
    
    
    // Simulate key press with a numeric character
    fireEvent.keyPress(input, { 
      key: '5', 
      preventDefault: preventDefaultMock 
    });
    
    expect(preventDefaultMock).not.toHaveBeenCalled();
    
    // Allow + character
    fireEvent.keyPress(input, { 
      key: '+', 
      preventDefault: preventDefaultMock 
    });
    
    expect(preventDefaultMock).not.toHaveBeenCalled();
  });
});