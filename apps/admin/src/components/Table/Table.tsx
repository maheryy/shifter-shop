import SearchBar from "@/components/Table/SearchBar";
import TableHeader from "@/components/Table/TableHeader";
import TableBottom from "@/components/Table/TableBottom"
import { useState, useEffect, Fragment } from 'react';
import { TableColumns } from "@/types/table";
import React from "react";

const Table = <T,>({ tableColumns, items, renderRow }: TableProps<T>) => {
  const rowsPerPageOptions = [5, 10, 25, 50, 100]; // Options for rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [recordsPerPage, setRecordsPerPage] = useState(rowsPerPageOptions[0]); // Number of records per page
  const [query, setQuery] = useState(''); // Search query

  // Filtered data state
  const [filteredData, setFilteredData] = useState<T[]>(items);

  useEffect(() => {
    const getFilteredData = (query: string, items: T[]) => {
      if (!query) {
        return items;
      }

      return items.filter((row: any) => {
        return Object.keys(row).some((key) => {
          return row[key].toString().toLowerCase().includes(query.toLowerCase());
        });
      });
    };

    const updatedFilteredData = getFilteredData(query, items);
    setFilteredData(updatedFilteredData);
    setCurrentPage(1); // Reset current page to 1 when filtering
  }, [items, query]);

  const nbRecords = filteredData.length; // Total number of records
  const lastIndex = currentPage * recordsPerPage; // Max index of the current page
  const firstIndex = lastIndex - recordsPerPage; // Min index of the current page
  const currentRecords = filteredData.slice(firstIndex, lastIndex); // Records on the current page
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

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <SearchBar query={query} handleSearchQuery={handleSearchQuery} />
          <table className="w-full whitespace-no-wrap">
            <TableHeader tableColumns={tableColumns} />
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {currentRecords.map((item, index) => (
                <Fragment key={index}>
                  {renderRow(item)}
                </Fragment>
              ))}
            </tbody>
          </table>
          <TableBottom
            nbRecords={nbRecords}
            rowsPerPage={rowsPerPageOptions}
            recordsPerPage={recordsPerPage}
            handleRecordsPerPageChange={handleRecordsPerPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
            prePage={prePage}
            nextPage={nextPage}
          />
        </div>
      </div>
    </>
  );
}

interface TableProps<T> {
  tableColumns: TableColumns[];
  items: T[];
  renderRow: (item: T) => React.ReactNode;
}

export default Table;