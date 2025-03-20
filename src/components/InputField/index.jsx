import React, { useState, useEffect } from "react";

/**
 * General purpose input field component with validation
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique ID for the input field
 * @param {string} props.label - Label text for the input field
 * @param {string} props.type - Input type (text, tel, etc.)
 * @param {string} props.name - Name attribute for the input field
 * @param {string} props.value - Current value of the input field
 * @param {function} props.onChange - Function to call when input changes
 * @param {function} props.onBlur - Function to call when input loses focus
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.placeholder - Placeholder text
 * @param {number} props.maxLength - Maximum length allowed for the input
 * @param {string} props.error - Error message to display
 * @param {boolean} props.showError - Whether to show the error message
 * @param {function} props.validate - Custom validation function
 * @param {boolean} props.isAsync - Whether validation is asynchronous
 * @param {function} props.asyncValidate - Async validation function
 * @param {Object} props.inputProps - Additional props for the input element
 */
const InputField = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  required = false,
  placeholder = "",
  maxLength,
  error = "",
  showError = false,
  validate,
  isAsync = false,
  asyncValidate,
  inputProps = {},
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [localError, setLocalError] = useState("");

  // Combine error states (prop error and local error)
  const displayError = error || localError;
  const shouldShowError = showError || (isTouched && displayError);

  // Handle input change
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    // Clear error when user starts typing again
    if (displayError) {
      setLocalError("");
    }
  };

  // Handle input blur
  const handleBlur = async (e) => {
    setIsTouched(true);

    if (onBlur) {
      onBlur(e);
    }

    // Perform validation if validate function is provided
    if (validate) {
      const result = validate(e.target.value);
      if (result !== true) {
        setLocalError(result);
        return;
      } else {
        setLocalError("");
      }
    }

    // Perform async validation if needed
    if (isAsync && asyncValidate) {
      setIsValidating(true);
      try {
        const result = await asyncValidate(e.target.value);
        if (result !== true) {
          setLocalError(result);
        } else {
          setLocalError("");
        }
      } catch (error) {
        setLocalError("Validation failed");
      } finally {
        setIsValidating(false);
      }
    }
  };

  return (
    <div className="input-field-container">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`input-field ${shouldShowError ? "input-error" : ""} ${
            isValidating ? "validating" : ""
          }`}
          aria-invalid={shouldShowError}
          aria-describedby={shouldShowError ? `${id}-error` : undefined}
          {...inputProps}
        />

        {isValidating && (
          <div className="validation-indicator">
            <span className="validation-spinner"></span>
          </div>
        )}
      </div>

      {shouldShowError && (
        <p id={`${id}-error`} className="error-message">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default InputField;
