import classNames from "classnames";

interface StepProps {
  children: React.ReactNode;
  isActive?: boolean;
  isDone?: boolean;
}

function Step({ isActive, isDone, children }: StepProps) {
  const className = classNames("font-medium", {
    "underline underline-offset-4 decoration-2": isActive,
    "text-primary": isDone,
  });

  return <li className={className}>{children}</li>;
}

export default Step;
