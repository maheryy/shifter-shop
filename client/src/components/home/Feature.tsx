import { ReactNode } from "react";

const Feature = ({ title, subtitle, icon }: FeatureProps) => {
  return (
    <div className="flex items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
      {icon}
      <div>
        <h4 className="text-lg font-medium capitalize">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

interface FeatureProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export default Feature;
