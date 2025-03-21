/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Step1 from './index';
import { useForm } from '../../../hooks/useForm';
import { mockFormContext } from '../../../__mocks__/formContextMock';

// Mock the form hook
jest.mock('../../../hooks/useForm', () => ({
  useForm: jest.fn(),
}));

// Mock the constants
jest.mock('../../../constants/form', () => ({
  submitButtonText: 'Submit',
  formSubmittedSuccessfully: 'Form Submitted Successfully',
  infoReceived: 'Information Received',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  phoneNumberLabel: 'Phone Number',
  corporationNumberLabel: 'Corporation Number',
  firstNameMaxLength: 50,
  lastNameMaxLength: 50,
  phoneNumberCountryCode: '+1',
  corporationNumberLength: 9,
  onboardingForm: 'Onboarding Form'
}));

describe('Step1 Component', () => {
  beforeEach(() => {
    useForm.mockReturnValue(mockFormContext);
  });

  test('renders the form with input fields', () => {
    render(<Step1 />);
    
    expect(screen.getByText('Onboarding Form')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Corporation Number')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('calls handleSubmit when form is submitted', () => {
    render(<Step1 />);
    
    fireEvent.submit(screen.getByRole('form'));
    expect(mockFormContext.handleSubmit).toHaveBeenCalled();
  });

  test('shows submitting state when form is submitting', () => {
    useForm.mockReturnValue({
      ...mockFormContext,
      isSubmitting: true,
    });
    
    render(<Step1 />);
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByText('Submitting...')).toBeDisabled();
  });

  test('shows success message when form is submitted', () => {
    useForm.mockReturnValue({
      ...mockFormContext,
      isSubmitted: true,
    });
    
    render(<Step1 />);
    
    expect(screen.getByText('Form Submitted Successfully')).toBeInTheDocument();
    expect(screen.getByText('Information Received')).toBeInTheDocument();
  });
});