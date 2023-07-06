import { useCallback, useEffect, useState } from "react";
import Table from "@/components/Table";
import TableRow from '@/components/Table/TableRow';
import { TableColumns } from "@/types/table";
import { EBusinessRequestStatus, TBusinessRequest } from "@shifter-shop/dictionary";
import { getBusinessRequests, setBusinessRequestStatus } from "@/api/profile.api";

const tableColumns: TableColumns[] = [
  {
    label: 'Company',
    key: 'company',
  },
  {
    label: 'Phone',
    key: 'phone'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Request Date',
    key: 'date'
  },
  {
    label: 'Actions',
    key: 'actions'
  },
];

const BusinessRequests = () => {
  const [businessRequests, setBusinessRequests] = useState<TBusinessRequest[]>([]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, businessRequestId: string) => {
    const newStatus = event.target.value as EBusinessRequestStatus;

    setBusinessRequestStatus(businessRequestId, newStatus)
      .then(() => {
        console.log('Business request status updated successfully.');
        updateBusinessRequestStatus(businessRequestId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update business request status:', error);
      });
  };

  const updateBusinessRequestStatus = useCallback((businessRequestId: string, newStatus: EBusinessRequestStatus) => {
    setBusinessRequests(prevBusinessRequests =>
      prevBusinessRequests.map(businessRequest =>
        businessRequest.id === businessRequestId ? { ...businessRequest, status: newStatus } : businessRequest
      )
    );
  }, []);

  useEffect(() => {
    getBusinessRequests(EBusinessRequestStatus.Pending)
      .then((businessRequests) => {
        setBusinessRequests(businessRequests);
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
              List of requests - business accounts
            </h2>
            {businessRequests.length > 0 ? (
              <Table
                tableColumns={tableColumns}
                items={businessRequests}
                renderRow={(item: TBusinessRequest) => (
                  <TableRow options={tableColumns} item={item} >
                    <select
                      value={item.status}
                      onChange={(event) => handleStatusChange(event, item.id)}
                    >
                      {Object.values(EBusinessRequestStatus).map((statusValue) => (
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
                  No Requests found
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessRequests;