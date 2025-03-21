// src/components/OnboardingForm/OnboardingForm.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import OnboardingForm from './OnboardingForm';

// Mock the Step1 component and FormProvider
jest.mock('./Step1', () => () => <div data-testid="step1-component">Step 1 Component</div>);
jest.mock('../../context/FormContext', () => ({
  FormProvider: ({ children }) => <div data-testid="form-provider">{children}</div>
}));

// Mock the Layout component
jest.mock('./Layout', () => ({ header, children }) => (
  <div data-testid="layout">
    <div data-testid="header">{header}</div>
    <div data-testid="content">{children}</div>
  </div>
));

describe('OnboardingForm Component', () => {
  test('renders with Layout and Step1 component', () => {
    render(<OnboardingForm />);
    
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toHaveTextContent('Step 1 of 5');
    expect(screen.getByTestId('form-provider')).toBeInTheDocument();
    expect(screen.getByTestId('step1-component')).toBeInTheDocument();
  });
});