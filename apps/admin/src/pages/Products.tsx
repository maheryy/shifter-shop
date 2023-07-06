import { useCallback, useEffect, useState } from 'react';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { getAllProducts, setProductStatus } from '@/api/product.api';
import { EGlobalStatus, TFullProduct } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import ModalProduct from '@/components/Modal/ModalProduct';
import TableRow from '@/components/Table/TableRow';
import { ModalButtonProps } from '@/components/Modal/ModalButton';

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

const buttons: ModalButtonProps[] = [
  {
    label: 'Close',
  },
];

const Products = () => {
  const [products, setProducts] = useState<TFullProduct[]>([]);

  const handleGlobalStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, productId: string) => {
    const newStatus = event.target.value as EGlobalStatus;

    setProductStatus(productId, newStatus)
      .then(() => {
        updateProductStatus(productId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update product status:', error);
      });
  };

  const updateProductStatus = useCallback((productId: string, newStatus: EGlobalStatus) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((productsResponse) => {
        setProducts(productsResponse.products);
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
            {products.length > 0 ? (
              <Table
                tableColumns={tableColumns}
                items={products}
                renderRow={(item: TFullProduct) => (
                  <TableRow options={tableColumns} item={item} >
                    <Modal buttons={buttons}>
                      <ModalProduct product={item} />
                    </Modal>
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
                  No products found
                </span>
              </div>
            )}
          </div>
        </main>
      </div >
    </div>
  );
};

export default Products;