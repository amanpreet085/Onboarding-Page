import Layout from "./Layout";
import Step1 from "./Step1";
import Error from "../Error";

const OnboardingForm = (props) => {
  // The below logic can be used to navigate to different steps. I'm gonna leave it as it is for this task
  const stepMap = [
    { id: 1, name: "Step1", component: Step1 },
    { id: 2, name: "Step2" },
  ];

  const currentStep = 1;

  const Component =
    stepMap?.find((step) => step.id === currentStep)?.component ?? Error;

  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default OnboardingForm;
