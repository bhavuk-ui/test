/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Catalog.css';
import { images } from './images/Imagesholder';
import { catelogListingApi } from '../dataSources/Api/catelogApi';
import { pageCounter } from '../helpers/index';
import Loader from './shared/loader';
import CatalogTabs from './catalog/tabs';
import { FILTER_INITIAL_VALUE } from '../constants/constants';
import CatalogFilter from './catalog/catalogFilter';

const Catalog = () => {
  const [activeLink, setActiveLink] = useState('data-source');
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem('selectedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [filterValue, setFilterValue] = useState(FILTER_INITIAL_VALUE);

  const filteredData = response;

  const handleButtonClick = () => setIsModalOpen(true);

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const nextPage = () => {
    setLoading(true);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setLoading(true);
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const offset = (currentPage - 1) * rowsPerPage;

  const fetchData = async () => {
    setLoading(true);
    await catelogListingApi({ limit: rowsPerPage, offset, filterData: filterValue })
    .then((res) => {
      if (res) {
        setResponse(res?.entries);
        setTotalCount(res?.total_count);
      }
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, currentPage, filterValue]);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.filter((itemId) => itemId !== id);
      localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => {
      const newSelectedItems = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];

      localStorage.setItem('selectedItems', JSON.stringify(newSelectedItems));
      return newSelectedItems;
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid body_color_right">
        <CatalogFilter
          setCatlogFilterValue={setFilterValue}
          filterValue={filterValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="parent_div">
          <CatalogTabs
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            setIsOpen={setIsOpen}
          />

          <div className="container-fluid">
            <div className="row">
              <main className="col-12 p-0">
                {activeLink === 'data-source' ? (
                  <>
                    <div className="overflows">
                      <table className="table table-bordered table-hover">
                        <thead className="table_color">
                          <tr className="table_row">
                            <th className="head_check_box">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  const allIds = filteredData?.map(
                                    (data) => data.id
                                  );
                                  if (
                                    selectedItems?.length ===
                                    filteredData?.length
                                  ) {
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
                                checked={
                                  selectedItems?.length === filteredData?.length
                                }
                              />
                            </th>
                            <th className="full_name">Full Name</th>
                            <th className="modality">Modality</th>
                            <th className="Data_provider">Data Provider</th>
                            <th className="Data_availablity">
                              Data Availability
                            </th>
                            <th className="personal_data">Personal Data</th>
                            <th className="terms">Terms</th>
                            <th className="Homepage">Source Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((data) => (
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
                          {pageCounter(
                            Math.ceil(totalCount / rowsPerPage)
                          )?.map((val) => (
                            <option value={val} key={`${val + 1}`}>
                              {val}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="d-flex align-items-center">
                        <span
                          className={`color-icon-button home_page ${
                            currentPage === 1 ? 'disabled cursor-default' : ''
                          }`}
                          onClick={currentPage === 1 ? null : prevPage}
                        >
                          Back
                        </span>

                        <span className="mx-3">
                          Page {currentPage} of{' '}
                          {Math.ceil(totalCount / rowsPerPage)}
                        </span>

                        <span
                          className={`color-icon-button home_page ${
                            currentPage === Math.ceil(totalCount / rowsPerPage)
                              ? 'disabled cursor-default'
                              : ''
                          }`}
                          onClick={
                            currentPage === Math.ceil(totalCount / rowsPerPage)
                              ? null
                              : nextPage
                          } // Prevents click if on the last page
                        >
                          Next
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="overflows">
                      <table className="table table-bordered table-hover">
                        <thead className="table_color">
                          <tr className="table_row table_row_selected">
                            <th className="full_name full_name_selected">
                              Full Name
                            </th>
                            <th className="modality  modality_selected">
                              Modality
                            </th>
                            <th className="Data_provider Data_provider_Selected">
                              Data Provider
                            </th>

                            <th className="terms terms__Selected">Terms</th>
                            <th className="Homepage Homepage_Selected">
                              Remove
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData
                            .filter((data) => selectedItems.includes(data.id))
                            .map((data) => (
                              <tr
                                key={data.id}
                                className={`table_data_row table_data_row_selected `}
                              >
                                <td>{data.full_name}</td>
                                <td>{data.modality}</td>
                                <td>{data.data_provider}</td>
                                {/* <td>{data.dataAvailability}</td>
                                                <td>{data.personalData}</td> */}
                                <td>{data.usage_terms_type}</td>
                                <td>
                                  <img
                                    className="delete "
                                    onClick={() => handleDelete(data.id)}
                                    src={images.Delete}
                                    alt="delete"
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      {isModalOpen && (
                        <div className="modal-overlay">
                          <div className="modal-content">
                            <div className="main_box_catalog">
                              <div className="Catalog_pop_box">
                                <div className="d-flex justify-content-between">
                                  <div></div>
                                  <div className="d-flex align-items-center Save_as_project">
                                    <h5 className="m-0">Save as a Project</h5>
                                  </div>
                                  <div>
                                    <button
                                      onClick={handleCloseModal}
                                      className="cross_btn p-0"
                                    >
                                      <img src={images.Cross1} alt="cross" />
                                    </button>
                                  </div>
                                </div>
                                <div className="input_text_container">
                                  <div class="input-wrapper">
                                    <label
                                      for="first"
                                      className="label-inputtext"
                                    >
                                      Project Name
                                    </label>
                                    <input
                                      type="text"
                                      className="input-text"
                                      placeholder="Badal.Ai"
                                      required
                                    />
                                  </div>
                                  <div class="input-wrapper">
                                    <label
                                      for="first"
                                      className="label-inputtext"
                                    >
                                      Project discription
                                    </label>
                                    <input
                                      type="text"
                                      className="input-text "
                                      placeholder="badal.Ai"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="botton_comb d-flex justify-content-end">
                                <div className="d-flex button_bar">
                                  <div>
                                    <button className=" Filters">Cancel</button>
                                  </div>
                                  <div>
                                    <button className=" Filters filter_apply_btn">
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="botton_comb d-flex justify-content-end">
                      <div className="d-flex button_bar">
                        <div>
                          <button
                            className=" Save_aProject"
                            onClick={handleButtonClick}
                          >
                            Save as Project
                          </button>
                        </div>{' '}
                        <div>
                          <button className=" filter_apply_btn Bill_Material">
                            Generate Data Bill of Material
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
