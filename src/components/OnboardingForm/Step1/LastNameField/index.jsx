import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import { lastNameLabel, lastNameMaxLength } from "../../../../constants/form";

const LastName = () => {
  const { values, errors, touched, handleChange, handleBlur } = useForm();

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
    />
  );
};

export default LastName;
