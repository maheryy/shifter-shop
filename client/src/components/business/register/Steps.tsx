import { useLocation } from "react-router-dom";
import Step from "./Step";

type Step = "Account setup" | "Business details" | "Finish";

function Steps() {
  const { pathname } = useLocation();

  const record: Record<string, Step> = {
    "/business/register/landing": "Account setup",
    "/business/register": "Account setup",
    "/business/login": "Account setup",
    "/business/register/business-info": "Business details",
    "/business/register/finish": "Finish",
  };

  const steps = [...new Set(Object.values(record))];

  return (
    <ul className="flex p-4">
      {steps.map((step) => {
        const currentStep = record[pathname];
        const currentStepIndex = steps.indexOf(currentStep);
        const stepIndex = steps.indexOf(step);
        const isActive = currentStep === step;
        const isDone = currentStepIndex > stepIndex;

        return (
          <Step isActive={isActive} isDone={isDone}>
            {step}
          </Step>
        );
      })}
    </ul>
  );
}

export default Steps;
