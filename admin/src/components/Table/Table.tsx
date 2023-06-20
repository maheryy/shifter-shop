import Pagination from './Pagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useState } from 'react';

const Table = ({ headers, data }: TableProps) => {
  const rowsPerPage = [5, 10, 25, 50, 100];
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(rowsPerPage[0]);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

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