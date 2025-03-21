import React from "react";
import FirstName from "./FirstNameField";
import LastName from "./LastNameField";
import PhoneNumber from "./PhoneField";
import CorporationNumber from "./CorporationNumber";
import { useForm } from "../../../hooks/useForm";
import "../styles.css";
import {
  submitButtonText as SUBMIT_BTN_TEXT,
  formSubmittedSuccessfully as FORM_SUBMITTED,
  infoReceived as INFO_RECEIVED,
} from "../../../constants/form";
import Header from "./Header";

const Step1 = () => {
  const { isSubmitting, isSubmitted, handleSubmit } = useForm();

  if (isSubmitted) {
    return (
      <div className="success-message fade-in">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
          </div>
        </div>
        <h2>{FORM_SUBMITTED}</h2>
        <p>{INFO_RECEIVED}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${isSubmitting ? "form-submitting" : ""}`}
    >
      <div className="step-container">
        <div className="form-title">
          <Header />
        </div>
        <div className="form-row">
          <FirstName />
          <LastName />
        </div>
        <div className="form-row">
          <PhoneNumber />
        </div>
        <div className="form-row">
          <CorporationNumber />
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : SUBMIT_BTN_TEXT}
        </button>
      </div>
    </form>
  );
};

export default Step1;
