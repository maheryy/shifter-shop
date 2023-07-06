const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div
      className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
    >
      <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </h4>
      {children}
      <div
        className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
      >
      </div>
    </div>
  )
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export default ChartCard;