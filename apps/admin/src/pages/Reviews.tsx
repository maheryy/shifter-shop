import { useCallback, useEffect, useState } from 'react';
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { getAllReviews, setReviewStatus } from '@/api/review.api';
import { EGlobalStatus, TFullReview } from '@shifter-shop/dictionary';
import _get from "lodash.get";
import { TableColumns } from '@/types/table';
import TableRow from '@/components/Table/TableRow';
import ModalReview from '@/components/Modal/ModalReview';
import { ModalButtonProps } from '@/components/Modal/ModalButton';

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
    key: 'product.name'
  },
  {
    label: 'Author (Email)',
    key: 'author.email'
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

const buttons: ModalButtonProps[] = [
  {
    label: 'Close',
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<TFullReview[]>([]);

  const handleGlobalStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, reviewId: string) => {
    const newStatus = event.target.value as EGlobalStatus;

    setReviewStatus(reviewId, newStatus)
      .then(() => {
        updateReviewStatus(reviewId, newStatus);
      })
      .catch((error) => {
        console.log('Failed to update review status:', error);
      });
  };

  const updateReviewStatus = useCallback((reviewId: string, newStatus: EGlobalStatus) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, status: newStatus } : review
      )
    );
  }, []);

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
                    <Modal buttons={buttons}>
                      <ModalReview review={item} />
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