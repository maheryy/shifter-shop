import Pagination from './Pagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useState } from 'react';

const Table = ({ headers, data }: TableProps) => {
  const rowsPerPage = [5, 10, 25, 50, 100]; // Options for rows per page
  const nbRecords = data.length; // Total number of records
  const [currentPage, setCurrentPage] = useState(1);  // Current page number
  const [recordsPerPage, setRecordsPerPage] = useState(rowsPerPage[0]); // Number of records per page
  const lastIndex = currentPage * recordsPerPage; // Max index of the current page
  const firstIndex = lastIndex - recordsPerPage; // Min index of the current page
  const currentRecords = data.slice(firstIndex, lastIndex); // Records on the current page
  const totalPages = Math.ceil(nbRecords / recordsPerPage); // Total number of pages

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRecordsPerPage = parseInt(event.target.value);
    setRecordsPerPage(selectedRecordsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <TableHeader headers={headers} />
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {currentRecords.map((row) => (
                <TableRow row={row} key={row.id} />
              ))}
            </tbody>

          </table>
          <Pagination
            nbRecords={nbRecords}
            rowsPerPage={rowsPerPage}
            recordsPerPage={recordsPerPage}
            handleRecordsPerPageChange={handleRecordsPerPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
            prePage={prePage}
            nextPage={nextPage} />
        </div>
      </div>
    </>
  );
}

interface TableProps {
  headers: string[];
  data: any[];
}

export default Table;