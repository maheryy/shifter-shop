import { useEffect, useState } from 'react';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { getAllProducts } from '@/api/product.api';
import { TFullProduct } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import ModalProduct from '@/components/Modal/ModalProduct';
import TableRow from '@/components/Table/TableRow';

const tableColumns: TableColumns[] = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Price',
    key: 'price'
  },
  {
    label: 'Category',
    key: 'category.name'
  },
  {
    label: 'Seller',
    key: 'seller.firstname'
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

const Products = () => {
  const [products, setProducts] = useState<TFullProduct[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
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
              List of Products
            </h2>
            <Table
              tableColumns={tableColumns}
              items={products}
              renderRow={(item: TFullProduct) => (
                <TableRow options={tableColumns} item={item} >
                  <Modal>
                    <ModalProduct product={item} />
                  </Modal>
                </TableRow>
              )}
            />
          </div>
        </main>
      </div >
    </div>
  );
};

export default Products;