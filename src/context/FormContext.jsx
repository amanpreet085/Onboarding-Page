import React, { createContext, useCallback, useReducer } from "react";
import {
  corporationNumberValidationUrl,
  profileDetailsSubmissionUrl,
} from "../constants/api";

// Define the initial state structure for our form
const initialFormState = {
  values: {
    firstName: "",
    lastName: "",
    phone: "",
    corporationNumber: "",
  },
  touched: {
    firstName: false,
    lastName: false,
    phone: false,
    corporationNumber: false,
  },
  errors: {
    firstName: "",
    lastName: "",
    phone: "",
    corporationNumber: "",
  },
  isSubmitting: false,
  isSubmitted: false,
  submitError: "",
  isValid: false,
  asyncValidationInProgress: {
    corporationNumber: false,
  },
};

// Action types for our reducer
const ACTIONS = {
  SET_FIELD_VALUE: "SET_FIELD_VALUE",
  SET_FIELD_TOUCHED: "SET_FIELD_TOUCHED",
  SET_FIELD_ERROR: "SET_FIELD_ERROR",
  SET_ASYNC_VALIDATION: "SET_ASYNC_VALIDATION",
  RESET_FORM: "RESET_FORM",
  SET_SUBMITTING: "SET_SUBMITTING",
  SET_SUBMITTED: "SET_SUBMITTED",
  SET_SUBMIT_ERROR: "SET_SUBMIT_ERROR",
  VALIDATE_FORM: "VALIDATE_FORM",
};

// Reducer to handle all form state updates
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        // Clear error when user types
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      };

    case ACTIONS.SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.value,
        },
      };

    case ACTIONS.SET_FIELD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case ACTIONS.SET_ASYNC_VALIDATION:
      return {
        ...state,
        asyncValidationInProgress: {
          ...state.asyncValidationInProgress,
          [action.field]: action.isValidating,
        },
      };

    case ACTIONS.RESET_FORM:
      return initialFormState;

    case ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case ACTIONS.SET_SUBMITTED:
      return {
        ...state,
        isSubmitted: action.isSubmitted,
      };

    case ACTIONS.SET_SUBMIT_ERROR:
      return {
        ...state,
        submitError: action.error,
      };

    case ACTIONS.VALIDATE_FORM: {
      // Update isValid based on whether there are any errors
      const hasErrors = Object.values(state.errors).some(
        (error) => error !== ""
      );
      const hasEmptyRequiredFields = Object.entries(state.values).some(
        ([field, value]) =>
          !value &&
          ["firstName", "lastName", "phone", "corporationNumber"].includes(
            field
          )
      );
      const asyncValidationInProgress = Object.values(
        state.asyncValidationInProgress
      ).some((inProgress) => inProgress);

      return {
        ...state,
        isValid:
          !hasErrors && !hasEmptyRequiredFields && !asyncValidationInProgress,
      };
    }

    default:
      return state;
  }
};

// Create the context
const FormContext = createContext(null);

// Form Provider Component
export const FormProvider = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // Validation functions
  const validateFirstName = (value) => {
    if (!value) return "First name is required";
    if (value.length > 50) return "First name cannot exceed 50 characters";
    return "";
  };

  const validateLastName = (value) => {
    if (!value) return "Last name is required";
    if (value.length > 50) return "Last name cannot exceed 50 characters";
    return "";
  };

  const validatePhone = (value) => {
    if (!value) return "Phone number is required";
    if (!/^\+1[0-9]{10}$/.test(value))
      return "Please enter a valid Canadian phone number";
    return "";
  };

  const validateCorporationNumber = (value) => {
    if (!value) return "Corporation number is required";
    if (value.length !== 9) return "Corporation number must be 9 characters";
    return "";
  };

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTIONS.SET_FIELD_VALUE, field: name, value });

    // Validate field on change
    let error = "";
    switch (name) {
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "corporationNumber":
        error = validateCorporationNumber(value);
        break;
      default:
        break;
    }

    dispatch({ type: ACTIONS.SET_FIELD_ERROR, field: name, error });
    dispatch({ type: ACTIONS.VALIDATE_FORM });
  }, []);

  // Handle field blur
  const handleBlur = useCallback(async (e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTIONS.SET_FIELD_TOUCHED, field: name, value: true });

    // Validate on blur
    let error = "";
    switch (name) {
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "corporationNumber":
        error = validateCorporationNumber(value);

        // If basic validation passes, do async validation
        if (!error && value.length === 9) {
          dispatch({
            type: ACTIONS.SET_ASYNC_VALIDATION,
            field: name,
            isValidating: true,
          });

          try {
            const response = await fetch(
              `${corporationNumberValidationUrl}${value}`
            );
            const data = await response.json();

            if (!data.valid) {
              error = data.message || "Invalid corporation number";
            }
          } catch {
            error = "Failed to validate corporation number";
          } finally {
            dispatch({
              type: ACTIONS.SET_ASYNC_VALIDATION,
              field: name,
              isValidating: false,
            });
          }
        }
        break;
      default:
        break;
    }

    dispatch({ type: ACTIONS.SET_FIELD_ERROR, field: name, error });
    dispatch({ type: ACTIONS.VALIDATE_FORM });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Mark all fields as touched
      Object.keys(formState.touched).forEach((field) => {
        dispatch({ type: ACTIONS.SET_FIELD_TOUCHED, field, value: true });
      });

      // Validate all fields
      const errors = {
        firstName: validateFirstName(formState.values.firstName),
        lastName: validateLastName(formState.values.lastName),
        phone: validatePhone(formState.values.phone),
        corporationNumber: validateCorporationNumber(
          formState.values.corporationNumber
        ),
      };

      // Update all errors
      Object.entries(errors).forEach(([field, error]) => {
        dispatch({ type: ACTIONS.SET_FIELD_ERROR, field, error });
      });

      // Check if there are any errors
      const hasErrors = Object.values(errors).some((error) => error !== "");

      if (!hasErrors) {
        dispatch({ type: ACTIONS.SET_SUBMITTING, isSubmitting: true });
        dispatch({ type: ACTIONS.SET_SUBMIT_ERROR, error: "" });

        try {
          const response = await fetch(profileDetailsSubmissionUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: formState.values.firstName,
              lastName: formState.values.lastName,
              corporationNumber: formState.values.corporationNumber,
              phone: formState.values.phone,
            }),
          });

          if (response.ok) {
            dispatch({ type: ACTIONS.SET_SUBMITTED, isSubmitted: true });
          } else {
            const errorData = await response.json();
            dispatch({
              type: ACTIONS.SET_SUBMIT_ERROR,
              error: errorData.message || "Form submission failed",
            });
          }
        } catch {
          dispatch({
            type: ACTIONS.SET_SUBMIT_ERROR,
            error: "Error occurred in sending data",
          });
        } finally {
          dispatch({ type: ACTIONS.SET_SUBMITTING, isSubmitting: false });
        }
      }
      dispatch({ type: ACTIONS.VALIDATE_FORM });
    },
    [
      formState.values.firstName,
      formState.values.lastName,
      formState.values.phone,
      formState.values.corporationNumber,
      formState.touched,
    ]
  );

  // Context value
  const value = {
    ...formState,
    handleChange,
    handleBlur,
    handleSubmit,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormContext;
