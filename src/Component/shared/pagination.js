import React from 'react';

const Pagination = (props) => {
  const { prevPage, currentPage, totalCount, rowsPerPage, nextPage } = props;
  return (
    <div className="d-flex align-items-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="btn btn-primary"
      >
        Back
      </button>

      <span className="mx-3">
        Page {currentPage} of {Math.ceil(totalCount / rowsPerPage)}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === Math.ceil(totalCount / rowsPerPage)}
        className="btn btn-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
