import React from 'react';

const PaginationControls = ({ currentPage, totalPages, goToPreviousPage, goToNextPage }) => {
    return (
        <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div> 
    )
}

export default PaginationControls;