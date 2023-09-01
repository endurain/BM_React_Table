import React, { useState } from 'react';
import PaginationControls from './controls/PaginationControls';

const DataTable = ({ data }) => {
    // set table to asc row by name
    const setInitialNameSort  = [...data.body].sort((a, b) => a.name.localeCompare(b.name));
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
      const isSameColumn = sortColumn === columnName;
      let newSortOrder;
  
      if (!isSameColumn) {
          // If a different column is clicked, set the default sorting order to 'asc'.
          newSortOrder = 'asc';
      } else {
          // If the same column is clicked, toggle the sorting order.
          newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      }
  
      const sorted = [...data.body].sort((a, b) => {
          const aValue = a[columnName];
          const bValue = b[columnName];
  
          // Date column - convert into date objs
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
  
      setSortOrder(newSortOrder);
      setSortColumn(columnName);
      setSortedData(sorted);
  };

    const HeaderCell = ({ label, onClick }) => {
        return <th scope="col" onClick={onClick}>{label}</th>;
    };
  
    const DataRow = ({ data, rowNumber }) => {
      return (
        <tr>
            <td>{rowNumber}</td>
            {Object.keys(data).map(key => (
              <td key={key}>{data[key]}</td>
            ))}
        </tr>
      );
    };

  return (
    <div>
      <table className="data-table">
        <thead className='data-table__head'>
          <tr>
            <HeaderCell label={''} />
            {Object.values(data.head).map((label, index) => (
              <HeaderCell
                label={label} 
                key={label}
                onClick={() => { handleSort(Object.keys(data.head)[index]) }} />
            ))}
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