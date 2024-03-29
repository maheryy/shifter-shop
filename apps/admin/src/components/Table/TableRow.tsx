import _get from "lodash.get";
import { TableColumns } from "@/types/table";

const TableRow = <T,>({ options, item, children }: TableRowProps<T>) => {
  return (
    <tr className="text-gray-700 dark:text-gray-400" >
      {options.map((option, index) => {
        if (option.key === 'actions') {
          return (
            <td
              key={index}
              className="px-4 py-3"
            >
              <div className="flex items-center space-x-4 text-sm">
                {children}
              </div>
            </td>
          );
        }
        if (option.key === 'date') {
          let date = new Date(String(_get(item, option.key)));
          return (
            <td
              key={index}
              className="px-4 py-3"
            >
              <div className="flex items-center text-sm">
                <div>
                  <p className="font-semibold">
                    {date.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {date.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </td>
          )
        }
        return <td
          key={index}
          className="px-4 py-3"
        >
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">
                {_get(item, option.key)}
              </p>
            </div>
          </div>
        </td>
      }
      )}
    </tr>
  );
};

interface TableRowProps<T> {
  options: TableColumns[];
  item: T;
  children: React.ReactNode;
}

export default TableRow;