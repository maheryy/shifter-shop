const Pagination = ({ nbRecords, rowsPerPage, recordsPerPage, handleRecordsPerPageChange, currentPage, totalPages, changePage, prePage, nextPage }: PaginationProps) => {
  const numbers = Array.from(Array(totalPages).keys()).map((number) => number + 1); // [1, 2, 3, ..., totalPages]
  const firstRecordIndex = currentPage * recordsPerPage - recordsPerPage + 1; // Index of the first record on the current page
  const lastRecordIndex = currentPage * recordsPerPage > nbRecords ? nbRecords : currentPage * recordsPerPage; // Index of the last record on the current page

  return (
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex col-span-3 mt-2 sm:mt-auto sm:justify-start">
        <span className="py-1 mr-2">Rows per page:</span>
        <select
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
          value={recordsPerPage}
          onChange={handleRecordsPerPageChange}
        >
          {rowsPerPage.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </span>
      <span className="flex items-center col-span-3">
        Showing {firstRecordIndex}-{lastRecordIndex} of {nbRecords} results
      </span>
      <span className="flex col-span-3 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button
                className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Previous"
                onClick={prePage}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {numbers.map((number) => (
              <li key={number}>
                <button
                  className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${number === currentPage ? 'text-white bg-purple-600' : ''
                    }`} onClick={() => changePage(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Next"
                onClick={nextPage}
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  );
};

interface PaginationProps {
  nbRecords: number;
  rowsPerPage: number[];
  recordsPerPage: number;
  handleRecordsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  prePage: () => void;
  nextPage: () => void;
}

export default Pagination;