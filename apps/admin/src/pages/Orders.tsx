import { useCallback, useEffect, useState } from 'react';
import { getAllOrders } from '@/api/order.api';
import { TFullOrder, EOrderStatus } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableRow from '@/components/Table/TableRow';
import ModalOrder from '@/components/Modal/ModalOrder';
import { setOrderStatus } from '@/api/order.api';

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

const buttons = [
  {
    label: 'Close',
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<TFullOrder[]>([]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const newStatus = event.target.value as EOrderStatus;

    setOrderStatus(orderId, newStatus)
      .then(() => {
        console.log('Order status updated successfully.');
        updateOrderStatus(orderId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update order status:', error);
      });
  };

  const updateOrderStatus = useCallback((orderId: string, newStatus: EOrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }, []);

  const fetchAllOrders = useCallback(() => {
    getAllOrders()
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

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
                  <TableRow options={tableColumns} item={item} key={item.id}>
                    <Modal buttons={buttons}>
                      <ModalOrder order={item} />
                    </Modal>
                    <select
                      value={item.status}
                      onChange={(event) => handleStatusChange(event, item.id)}
                    >
                      {Object.values(EOrderStatus).map((statusValue) => (
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