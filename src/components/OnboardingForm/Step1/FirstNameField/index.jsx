import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  firstNameLabel,
  firstNameMaxLength,
  requiredFieldMessage,
} from "../../../../constants/form";

const FirstName = () => {
  const { values, errors, touched, handleChange, handleBlur } = useForm();

  return (
    <InputField
      id="firstName"
      label={firstNameLabel}
      name="firstName"
      value={values.firstName}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      maxLength={firstNameMaxLength}
      error={errors.firstName}
      showError={touched.firstName && errors.firstName}
      validate={(value) => {
        if (!value) return requiredFieldMessage;
        if (value.length > firstNameMaxLength)
          return `First name cannot exceed ${firstNameMaxLength} characters`;
        return true;
      }}
    />
  );
};

export default FirstName;
