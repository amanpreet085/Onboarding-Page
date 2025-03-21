import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  phoneNumberLabel,
  phoneNumberCountryCode,
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
      inputProps={{
        // Prevent non-numeric characters except +
        onKeyPress: (e) => {
          const key = e.key;
          if (key !== "+" && isNaN(parseInt(key, 10))) {
            e.preventDefault();
          }
        },
      }}
    />
  );
};

export default PhoneNumber;
