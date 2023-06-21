import DeleteIcon from "./DeleteIcon";
import UpdateIcon from "./UpdateIcon";

const TableRow = ({ row }: TableRowProps) => {
    const keys = Object.keys(row).filter((key) => key !== "id");

    return (
        <tr className="text-gray-700 dark:text-gray-400" key={row.id}>
            {keys.map((key) => (
                <td className="px-4 py-3" key={key}>
                    <div className="flex items-center text-sm">
                        <div>
                            <p className="font-semibold">{row[key]}</p>
                        </div>
                    </div>
                </td>
            ))}
            <td className="px-4 py-3">
                <div className="flex items-center space-x-4 text-sm">
                    <UpdateIcon />
                    <DeleteIcon />
                </div>
            </td>
        </tr>
    );
};

interface TableRowProps {
    row: Record<string, any>;
}


export default TableRow;