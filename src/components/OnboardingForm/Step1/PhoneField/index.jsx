import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  phoneNumberLabel,
  requiredFieldMessage,
  phoneNumberCountryCode,
  validPhoneMessage,
} from "../../../../constants/form";

const PhoneNumber = () => {
  const { values, errors, touched, handleChange, handleBlur } = useForm();

  return (
    <InputField
      id="phone"
      label={phoneNumberLabel}
      type="tel"
      name="phone"
      value={values.phone}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      placeholder={`${phoneNumberCountryCode}XXXXXXXXXX`}
      error={errors.phone}
      showError={touched.phone && errors.phone}
      validate={(value) => {
        if (!value) return requiredFieldMessage;
        // Validate Canadian phone numbers starting with +1
        if (!/^\+1[0-9]{10}$/.test(value)) return validPhoneMessage;
        return true;
      }}
      inputProps={{
        // Prevent non-numeric characters except +
        onKeyPress: (e) => {
          const key = e.key;
          // Allow only numbers and + at the beginning
          if (key !== "+" && isNaN(parseInt(key, 10))) {
            e.preventDefault();
          }
          // Allow + only at the beginning
          if (key === "+" && e.target.value.length > 0) {
            e.preventDefault();
          }
        },
      }}
    />
  );
};

export default PhoneNumber;
