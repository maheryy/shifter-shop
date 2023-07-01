import { useEffect, useState } from 'react';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { getAllReviews } from '@/api/review.api';
import { TFullReview } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import TableRow from '@/components/Table/TableRow';
import ModalReview from '@/components/Modal/ModalReview';

const tableColumns: TableColumns[] = [
  {
    label: 'Title',
    key: 'title',
  },
  {
    label: 'Rating',
    key: 'rating'
  },
  {
    label: 'Product',
    key: 'category.name'
  },
  {
    label: 'Author',
    key: 'seller.firstname'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Published At',
    key: 'date'
  },
  {
    label: 'Actions',
    key: 'actions'
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<TFullReview[]>([]);

  useEffect(() => {
    getAllReviews()
      .then((reviews) => {
        setReviews(reviews);
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
              List of Reviews
            </h2>
            {reviews.length > 0 ? (
            <Table
              tableColumns={tableColumns}
              items={reviews}
              renderRow={(item: TFullReview) => (
                <TableRow options={tableColumns} item={item} >
                  <Modal>
                    <ModalReview review={item} />
                  </Modal>
                </TableRow>
              )}
            />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  No reviews found
                </span>
              </div>
            )}
          </div>
        </main>
      </div >
    </div>
  );
};

export default Reviews;