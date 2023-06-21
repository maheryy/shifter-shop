const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        {headers.map((header, index) => (
          <th className="px-4 py-3" key={index}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface TableHeaderProps {
  headers: string[];
}

export default TableHeader;