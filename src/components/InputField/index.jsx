import React, { useState, useEffect } from "react";
import "./styles.css";

/**
 * General purpose input field component with validation
 */
const InputField = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  maxLength,
  error = "",
  showError = false,
  validate,
  isAsync = false,
  isValidating = false,
  asyncValidate,
  inputProps = {},
  className = "",
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [localError, setLocalError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Combine error states (prop error and local error)
  const displayError = error || localError;
  const shouldShowError = showError || (isTouched && displayError);

  // Update valid state when value changes
  useEffect(() => {
    if (validate && value) {
      const result = validate(value);
      setIsValid(result === true && !displayError);
    } else {
      setIsValid(false);
    }
  }, [value, validate, displayError]);

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
        setIsValid(false);
        return;
      } else {
        setLocalError("");
        setIsValid(true);
      }
    }

    // Perform async validation if needed
    if (isAsync && asyncValidate && e.target.value) {
      try {
        const result = await asyncValidate(e.target.value);
        if (result !== true) {
          setLocalError(result);
          setIsValid(false);
        } else {
          setLocalError("");
          setIsValid(true);
        }
      } catch {
        setLocalError("Validation failed");
        setIsValid(false);
      }
    }
  };

  // Determine validation status for styling
  const getInputWrapperClass = () => {
    if (isValidating) return "input-wrapper";
    if (value && isTouched) {
      return `input-wrapper ${
        isValid ? "valid" : shouldShowError ? "invalid" : ""
      }`;
    }
    return "input-wrapper";
  };

  return (
    <div className={`input-field-container ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      <div className={getInputWrapperClass()}>
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
        <p id={`${id}-error`} className="error-message slide-in">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default InputField;
