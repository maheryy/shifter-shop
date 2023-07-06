import { useLocation } from "react-router-dom";
import Step from "@/components/business/register/Step";

type Step = "Account setup" | "Business details" | "Finish";

function Steps() {
  const { pathname } = useLocation();

  const record: Record<string, Step> = {
    "/business/register/landing": "Account setup",
    "/business/register": "Account setup",
    "/business/login": "Account setup",
    "/business/register/business-request": "Business details",
    "/business/register/finish": "Finish",
  };

  const steps = [...new Set(Object.values(record))];

  return (
    <ul className="container flex justify-between md:justify-around">
      {steps.map((step) => {
        const currentStep = record[pathname];

        if (!currentStep) {
          return null;
        }

        const currentStepIndex = steps.indexOf(currentStep);
        const stepIndex = steps.indexOf(step);
        const isActive = currentStep === step;
        const isDone = currentStepIndex > stepIndex;

        return (
          <Step isActive={isActive} isDone={isDone} key={step}>
            {step}
          </Step>
        );
      })}
    </ul>
  );
}

export default Steps;
