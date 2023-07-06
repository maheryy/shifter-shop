import { useCallback, useEffect, useState } from 'react';
import Table from "@/components/Table";
import { getAllCategories } from '@/api/category.api';
import { EGlobalStatus, TCategory } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import TableRow from '@/components/Table/TableRow';
import { setCategoryStatus } from '@/api/category.api';

const tableColumns: TableColumns[] = [
  {
    label: 'Name',
    key: 'name',
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

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  const handleGlobalStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, categoryId: string) => {
    const newStatus = event.target.value as EGlobalStatus;

    setCategoryStatus(categoryId, newStatus)
      .then(() => {
        updateCategoryStatus(categoryId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update category status:', error);
      });
  };

  const updateCategoryStatus = useCallback((categoryId: string, newStatus: EGlobalStatus) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId ? { ...category, status: newStatus } : category
      )
    );
  }, []);
  
  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
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
              List of Categories
            </h2>
            <Table
              tableColumns={tableColumns}
              items={categories}
              renderRow={(item: TCategory) => (
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
          </div>
        </main>
      </div >
    </div>
  );
};

export default Categories;