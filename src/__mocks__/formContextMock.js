export const mockFormContext = {
    values: {
      firstName: '',
      lastName: '',
      phone: '',
      corporationNumber: '',
    },
    touched: {
      firstName: false,
      lastName: false,
      phone: false,
      corporationNumber: false,
    },
    errors: {
      firstName: '',
      lastName: '',
      phone: '',
      corporationNumber: '',
    },
    isSubmitting: false,
    isSubmitted: false,
    submitError: '',
    isValid: false,
    asyncValidationInProgress: {
      corporationNumber: false,
    },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleSubmit: jest.fn(),
  };