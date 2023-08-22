import React, { useState } from 'react';

const DataTable = ({ data }) => {
    // declare state variables (sortedData, sortOrder, sortColumn) w/ corresponding updating function
    const [sortedData, setSortedData] = useState(data);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('');

    console.log(data);

    // handle the sorting logic when a column header is clicked
    const handleSort = (columnName) => {
        const isSameColumn = sortColumn === columnName;
        const newSortOrder = isSameColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        
        // updater functions
        setSortOrder(newSortOrder);
        setSortColumn(columnName);
    
        const sorted = [...sortedData].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];
            console.log('a'+ a);
            console.log('b' + b);
            
            // Data column
            if (columnName === 'dob') {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                return (aDate - bDate) * (newSortOrder === 'asc' ? 1 : -1);
            }
            // String (all other) columns
            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue) * (newSortOrder === 'asc' ? 1 : -1);
            }
        
            return (aValue - bValue) * (newSortOrder === 'asc' ? 1 : -1);
        });
    
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
    <table className="data-table">
      <thead>
        <tr>
            <HeaderCell label={"Row Number"} />
            <HeaderCell label={"Name"} onClick={() => handleSort('name')} />
            <HeaderCell label={"Favorite Food"} onClick={() => handleSort('favoriteFood')} />
            <HeaderCell label={"Favorite Color"} onClick={() => handleSort('favoriteColor')} />
            <HeaderCell label={"Number Of Pets"} onClick={() => handleSort('numberOfPets')} />
            <HeaderCell label={"Date of Birth"} onClick={() => handleSort('dob')} />
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <DataRow key={row.name} rowNumber={index + 1} data={row} />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;