const Feature = ({ title, subtitle, Icon }: FeatureProps) => {
  return (
    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
      <Icon />
      <div>
        <h4 className="font-medium capitalize text-lg">{title}</h4>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

interface FeatureProps {
  title: string;
  subtitle: string;
  Icon: string;
}

export default Feature;
