import React from "react";
import FirstName from "./FirstNameField";
import LastName from "./LastNameField";
import PhoneNumber from "./PhoneField";
import CorporationNumber from "./CorporationNumber";
import { FormProvider } from "../../../context/FormContext";

const Step1 = () => {
  return (
    <FormProvider>
      <div className="step-container">
        <div className="input-row">
          <FirstName />
          <LastName />
        </div>
        <div className="input-row">
          <PhoneNumber />
        </div>
        <div className="input-row">
          <CorporationNumber />
        </div>
      </div>
    </FormProvider>
  );
};

export default Step1;
