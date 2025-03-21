import React from "react";
import InputField from "../../../InputField";
import { useForm } from "../../../../hooks/useForm";
import {
  corporationNumberLabel,
  corporationNumberLength,
} from "../../../../constants/form";

const CorporationNumber = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    asyncValidationInProgress,
  } = useForm();

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
