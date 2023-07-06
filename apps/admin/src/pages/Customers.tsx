import { useCallback, useEffect, useState } from "react";
import Table from "@/components/Table";
import TableRow from '@/components/Table/TableRow';
import { TableColumns } from "@/types/table";
import { EGlobalStatus, TUser } from "@shifter-shop/dictionary";
import { getAllCustomers, setUserStatus } from "@/api/user.api";

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

const Customers = () => {
  const [customers, setCustomers] = useState<TUser[]>([]);

  const handleGlobalStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
    const newStatus = event.target.value as EGlobalStatus;

    setUserStatus(userId, newStatus)
      .then(() => {
        console.log('User status updated successfully.');
        updateUserStatus(userId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update user status:', error);
      });
  };

  const updateUserStatus = useCallback((userId: string, newStatus: EGlobalStatus) => {
    setCustomers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  }, []);

  useEffect(() => {
    getAllCustomers()
      .then((customers) => {
        setCustomers(customers);
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
              List of Customers
            </h2>
            {customers.length > 0 ? (
              <Table
                tableColumns={tableColumns}
                items={customers}
                renderRow={(item: TUser) => (
                  <TableRow options={tableColumns} item={item} >
                    <select
                      value={item.status}
                      onChange={(event) => handleGlobalStatusChange(event, item.id)}
                    >
                      {Object.values(EGlobalStatus).map((statusValue) => (
                        <option key={statusValue} value={statusValue}>
                          {statusValue}
                        </option>
                      ))}
                    </select>
                  </TableRow>
                )}
              />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  No customers found
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;