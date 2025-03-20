import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  corporationNumberLabel,
  corporationNumberLength,
  requiredFieldMessage,
  validCorporationNumberMessage,
} from "../../../../constants/form";
import { corporationNumberValidationUrl } from "../../../../constants/api";

const CorporationNumber = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    asyncValidationInProgress,
  } = useForm();

  // Async validation function for corporation number
  const validateCorporationNumber = async (value) => {
    if (!value || value.length !== corporationNumberLength) return false;

    try {
      const response = await fetch(`${corporationNumberValidationUrl}${value}`);
      const data = await response.json();
      return data.valid || data.message || validCorporationNumberMessage;
    } catch (error) {
      return "Failed to validate corporation number. Please try again.";
    }
  };

  return (
    <InputField
      id="corporationNumber"
      label={corporationNumberLabel}
      name="corporationNumber"
      value={values.corporationNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      maxLength={corporationNumberLength}
      error={errors.corporationNumber}
      showError={touched.corporationNumber && errors.corporationNumber}
      isAsync={true}
      isValidating={asyncValidationInProgress?.corporationNumber}
      validate={(value) => {
        if (!value) return requiredFieldMessage;
        if (value.length !== corporationNumberLength)
          return `Corporation number must be ${corporationNumberLength} characters`;
        return true;
      }}
      asyncValidate={validateCorporationNumber}
      inputProps={{
        // Prevent non-numeric characters
        onKeyPress: (e) => {
          const key = e.key;
          if (isNaN(parseInt(key, 10))) {
            e.preventDefault();
          }
        },
      }}
    />
  );
};

export default CorporationNumber;
