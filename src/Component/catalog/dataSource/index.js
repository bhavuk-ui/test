import React from 'react';

const DataSource = (props) => {
  const {
    displayedData,
    filteredData,
    setSelectedItems,
    selectedItems,
    handleCheckboxChange,
    rowsPerPage,
    handleRowsPerPageChange,
    currentPage,
    totalPages,
    totalPagesArray,
  } = props;

  return (
    <>
      <div className="overflows">
        <table className="table table-bordered table-hover">
          <thead className="table_color">
            <tr className="table_row">
              <th className="head_check_box">
                <input
                  type="checkbox"
                  onChange={() => {
                    const allIds = filteredData?.map((data) => data.id);
                    if (selectedItems?.length === filteredData?.length) {
                      setSelectedItems([]);
                      localStorage.removeItem('selectedItems');
                    } else {
                      setSelectedItems(allIds);
                      localStorage.setItem(
                        'selectedItems',
                        JSON.stringify(allIds)
                      );
                    }
                  }}
                  checked={selectedItems?.length === filteredData?.length}
                />
              </th>
              <th className="full_name">Full Name</th>
              <th className="modality">Modality</th>
              <th className="Data_provider">Data Provider</th>
              <th className="Data_availablity">Data Availability</th>
              <th className="personal_data">Personal Data</th>
              <th className="terms">Terms</th>
              <th className="Homepage">Source Link</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((data) => (
              <tr key={data.id} className={`table_data_row`}>
                <td className="head_check_box">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(data.id)}
                    onChange={() => handleCheckboxChange(data.id)}
                  />
                </td>
                <td>{data.full_name}</td>
                <td>{data.modality || '-'}</td>
                <td>{data.data_provider || '-'}</td>
                <td>{data.data_availability || '-'}</td>
                <td>{data.personal_data_type || '-'}</td>
                <td>{data.usage_terms_type || '-'}</td>
                <td>
                  {' '}
                  <a href={data.homepage} className="home_page">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between page page">
        <div className="d-flex align-items-center pages">
          <label htmlFor="rowsPerPage" className="rowsPerPage">
            Results per page
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {totalPagesArray?.map((val) => (
              <option value={val} key={`${val + 1}`}>{val}</option>
            ))}
          </select>
        </div>

        <div className="d-flex align-items-center">
          {' '}
          <span>
            {' '}
            Page {currentPage} of {totalPages}{' '}
          </span>
        </div>
      </div>
    </>
  );
};

export default DataSource;
