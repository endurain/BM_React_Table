import React, { useState } from 'react';
import PaginationControls from './controls/PaginationControls';

const DataTable = ({ data }) => {
    // set table to asc row by name
    const setInitialNameSort  = [...data].sort((a, b) => a.name.localeCompare(b.name));

    // state
    const [sortedData, setSortedData]   = useState(setInitialNameSort);
    const [sortOrder, setSortOrder]     = useState('asc');
    const [sortColumn, setSortColumn]   = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // pagination
    const itemsPerPage      = 5;
    const startIndex        = (currentPage -1) * itemsPerPage;
    const endIndex          = startIndex + itemsPerPage;
    const displayedPageRows = sortedData.slice(startIndex, endIndex);

    // Pagination control handlers
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(sortedData.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // sorting logic when a column header is clicked
    const handleSort = (columnName) => {
        let newSortOrder;
        const isSameColumn = sortColumn === columnName;

        // determine sorting order
       if (!isSameColumn ? newSortOrder = '' : newSortOrder = (sortOrder === 'asc' ? 'desc' : 'asc'));
  
        // sorting callback
        const sorted = [...data].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Date column - covert into date objs
            if (columnName === 'dob') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                return (aDate - bDate) * (newSortOrder === 'asc' ? 1 : -1);
            }

            // String columns (sans date)
            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue) * (newSortOrder === 'asc' ? 1 : -1);
            }

            return (aValue - bValue) * (newSortOrder === 'asc' ? 1 : -1);
        });
        
        // updater functions
        setSortOrder(newSortOrder);
        setSortColumn(columnName);
        setSortedData(sorted);
    };

    const HeaderCell = ({ label, onClick }) => {
        return <th onClick={onClick}>{label}</th>;
    };
  
    const DataRow = ({ data, rowNumber }) => {
        return (
            <tr>
                <td>{rowNumber}</td>
                <td>{data.name}</td>
                <td>{data.favoriteFood}</td>
                <td>{data.favoriteColor}</td>
                <td>{data.numberOfPets}</td>
                <td>{data.dob}</td>
            </tr>
        );
    };

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
              <HeaderCell label={" "} />
              <HeaderCell label={"Name"} onClick={() => handleSort('name')} />
              <HeaderCell label={"Favorite Food"} onClick={() => handleSort('favoriteFood')} />
              <HeaderCell label={"Favorite Color"} onClick={() => handleSort('favoriteColor')} />
              <HeaderCell label={"Number Of Pets"} onClick={() => handleSort('numberOfPets')} />
              <HeaderCell label={"Date of Birth"} onClick={() => handleSort('dob')} />
          </tr>
        </thead>
        <tbody>
          {displayedPageRows.map((row, index) => (
            <DataRow key={row.name} rowNumber={startIndex + index + 1} data={row} />
          ))}
        </tbody>
      </table>
      <PaginationControls 
        currentPage={currentPage}
        totalPages={Math.ceil(sortedData.length / itemsPerPage)}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
};

export default DataTable;