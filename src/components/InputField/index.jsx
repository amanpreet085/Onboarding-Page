import React from "react";
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

  isValidating = false,

  inputProps = {},
}) => {
  // Handle input change
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  // Handle input blur
  const handleBlur = async (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={`input-field-container`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
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
          className={`input-field ${showError ? "input-error" : ""} ${
            isValidating ? "validating" : ""
          }`}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          {...inputProps}
        />

        {isValidating && (
          <div className="validation-indicator">
            <span className="validation-spinner"></span>
          </div>
        )}
      </div>

      {showError && (
        <p id={`${id}-error`} className="error-message slide-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
