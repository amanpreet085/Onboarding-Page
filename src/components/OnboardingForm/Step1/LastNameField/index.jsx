import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  lastNameLabel,
  lastNameMaxLength,
  requiredFieldMessage,
} from "../../../../constants/form";

const LastName = () => {
  const { values, errors, touched, handleChange, handleBlur } = useForm();

  const validation = () => {
    const value = values?.lastName ?? "";
    if (!value) return requiredFieldMessage;
    if (value.length > lastNameMaxLength)
      return `Last name cannot exceed ${lastNameMaxLength} characters`;
    return true;
  };

  return (
    <InputField
      id="lastName"
      label={lastNameLabel}
      name="lastName"
      value={values?.lastName}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      maxLength={lastNameMaxLength}
      error={errors?.lastName}
      showError={touched?.lastName && errors?.lastName}
      validate={validation}
    />
  );
};

export default LastName;
