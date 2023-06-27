import { useEffect, useState } from 'react';
import { getAllOrders } from '@/api/order.api';
import { TFullOrder } from '@shifter-shop/dictionary';
import _get from "lodash.get";

const data: TableOptions[] = [
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
];

interface TableOptions {
    label: string;
    key: string;
}

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
                        <table>
                            <thead>
                                <tr>
                                    {data.map((item, index) => (
                                        <th
                                            key={index}
                                            className="px-4 py-3 text-sm"
                                        >
                                            {item.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        {data.map((item, index) => {
                                            if (item.key === 'actions') {
                                                return (
                                                    <td
                                                        key={index}
                                                        className="px-4 py-3 text-sm"
                                                    >
                                                    </td>
                                                );
                                            }
                                            return <td
                                                key={index}
                                                className="px-4 py-3 text-sm"
                                            >
                                                {_get(order, item.key)}
                                            </td>
                                        }
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Orders;