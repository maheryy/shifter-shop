import { useEffect, useState } from 'react';
import Table from "@/components/Table";
import { getAllCategories } from '@/api/category.api';
import { TCategory } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import TableRow from '@/components/Table/TableRow';
import UpdateIcon from '@/components/Table/UpdateIcon';
import DeleteIcon from '@/components/Table/DeleteIcon';

const tableColumns: TableColumns[] = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Actions',
    key: 'actions'
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

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
                    <div className="flex items-center space-x-4">
                        <UpdateIcon />
                        <DeleteIcon />
                    </div>
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