const Feature = ({ title, subtitle, icon }: FeatureProps) => {
  return (
    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
      <img src={icon} alt={title} className="w-12 h-12 object-contain" />
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
  icon: string;
}

export default Feature;
