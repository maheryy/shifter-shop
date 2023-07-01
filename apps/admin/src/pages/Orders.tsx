import { useEffect, useState } from 'react';
import { getAllOrders } from '@/api/order.api';
import { TFullOrder } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableRow from '@/components/Table/TableRow';
import ModalOrder from '@/components/Modal/ModalOrder';

const tableColumns: TableColumns[] = [
  {
    label: 'Reference',
    key: 'reference',
  },
  {
    label: 'Amount',
    key: 'amount'
  },
  {
    label: 'Customer',
    key: 'customer.firstname'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Date',
    key: 'date',
  },
  {
    label: 'Actions',
    key: 'actions',
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<TFullOrder[]>([]);

  useEffect(() => {
    getAllOrders()
      .then((orders) => {
        setOrders(orders);
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
              List of Orders
            </h2>
            {orders.length > 0 ? (
            <Table
              tableColumns={tableColumns}
              items={orders}
              renderRow={(item: TFullOrder) => (
                <TableRow options={tableColumns} item={item} >
                  <Modal>
                    <ModalOrder order={item} />
                  </Modal>
                </TableRow>
              )}
            />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  No orders found
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;