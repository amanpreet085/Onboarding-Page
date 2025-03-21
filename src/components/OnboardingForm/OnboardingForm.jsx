import Layout from "./Layout";
import Step1 from "./Step1";
import "./styles.css";
import { FormProvider } from "../../context/FormContext";

const OnboardingForm = () => {
  // The below logic can be used to navigate to different steps. I'm gonna leave it as it is for this task
  const stepMap = [
    { id: 1, name: "Step1", component: Step1 },
    { id: 2, name: "Step2" },
    { id: 3, name: "Step2" },
    { id: 4, name: "Step2" },
    { id: 5, name: "Step2" },
  ];

  const currentStep = 1;

  const Component = stepMap?.find((step) => step.id === currentStep)?.component;

  const totalSteps = stepMap?.length ?? 1;

  return (
    <Layout header={`Step ${currentStep} of ${totalSteps}`}>
      <FormProvider>
        <Component />
      </FormProvider>
    </Layout>
  );
};

export default OnboardingForm;
