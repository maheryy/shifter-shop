import { TableColumns } from "@/types/table";

const TableHeader = ({ tableColumns }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        {tableColumns.map((tableColumn, index) => (
          <th
            key={index}
            className="px-4 py-3"
          >
            {tableColumn.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface TableHeaderProps {
  tableColumns: TableColumns[];
}

export default TableHeader;