// src/components/OnboardingForm/Step1/Header/Header.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import { onboardingForm } from '../../../../constants/form';

// Mock the constants
jest.mock('../../../../constants/form', () => ({
  onboardingForm: 'Onboarding Form'
}));

describe('Header Component', () => {
  test('renders onboarding form header', () => {
    render(<Header />);
    expect(screen.getByText(onboardingForm)).toBeInTheDocument();
  });
});