import { useEffect, useState } from "react";
import Table from "@/components/Table";
import TableRow from '@/components/Table/TableRow';
import { TableColumns } from "@/types/table";
import { TUser } from "@shifter-shop/dictionary";
import { getAllAdmins } from "@/api/user.api";

const tableColumns: TableColumns[] = [
  {
    label: 'Email',
    key: 'email',
  },
  {
    label: 'Firstname',
    key: 'firstname'
  },
  {
    label: 'Lastname',
    key: 'lastname'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Actions',
    key: 'actions'
  },
];

const Admins = () => {
  const [admins, setAdmins] = useState<TUser[]>([]);

  useEffect(() => {
    getAllAdmins()
      .then((admins) => {
        setAdmins(admins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <h2
              className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
              List of Admins
            </h2>
            {admins.length > 0 ? (
              <Table
                tableColumns={tableColumns}
                items={admins}
                renderRow={(item: TUser) => (
                  <TableRow options={tableColumns} item={item} >
                  </TableRow>
                )}
              />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  No Admins found
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admins;