import React, { useState, useEffect, useRef } from 'react';
import './Catalog.css';
import { images } from './images/Imagesholder';
import { catelogListingApi } from './dataSources/Api/catelogApi';
import { pageCounter } from './helpers';
import Loader from './shared/loader';

const Catalog = () => {
  const [activeLink, setActiveLink] = useState('data-source');
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem('selectedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [filterName, setFilterName] = useState('');
  const [filterModality, setFilterModality] = useState('');
  const [filterTerms, setFilterTerms] = useState('');
  const [filterProvider, setFilterDataProvider] = useState([]);
  const [filterPersonalData, setFilterPersonalData] = useState([]);
  const [tempFilterName, setTempFilterName] = useState('');
  const [tempFilterModality, setTempFilterModality] = useState('');
  const [tempFilterTerms, setTempFilterTerms] = useState('');
  const [tempFilterProvider, setTempFilterDataProvider] = useState([]);
  const [tempFilterPersonalData, setTempFilterPersonalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const filteredData = response?.filter((data) => {
    return (
      data.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (!filterModality || data.modality === filterModality) &&
      (!filterTerms || data.usage_terms_type === filterTerms) &&
      (filterProvider.length === 0 ||
        filterProvider.includes(data.data_provider)) &&
      (filterPersonalData.length === 0 ||
        filterPersonalData.includes(data.personal_data_type))
    );
  });

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

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

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const offset = (currentPage - 1) * rowsPerPage;

  useEffect(() => {
    catelogListingApi({ limit: rowsPerPage, offset })
      .then((res) => {
        if (res) {
          setResponse(res?.entries);
          setTotalCount(res?.total_count);
        }
      })
      .finally(() => setLoading(false));
  }, [rowsPerPage, currentPage]);

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
  const handleDataAvailabilityChange = (value) => {
    setTempFilterDataProvider((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePersonalDataChange = (value) => {
    setTempFilterPersonalData((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
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

  const handleClick = (linkName) => {
    setActiveLink(linkName);
  };

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyFilters = () => {
    setFilterName(tempFilterName);
    setFilterModality(tempFilterModality);
    setFilterTerms(tempFilterTerms);
    setFilterDataProvider(tempFilterProvider);
    setFilterPersonalData(tempFilterPersonalData);
    toggleSidebar();
  };

  const cancelFilters = () => {
    setTempFilterName('');
    setTempFilterModality('');
    setTempFilterTerms('');
    setTempFilterDataProvider([]);
    setTempFilterPersonalData([]);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid body_color_right">
        <div className="sidebar-container">
          {isOpen && <div className="backdrop" onClick={toggleSidebar} />}
          <div
            className={`sidebar ${isOpen ? 'open' : 'closed'}`}
            ref={sidebarRef}
          >
            <aside className=" border-end">
              <div className="filter_section">
                <div className="d-flex justify-content-between cross_icon">
                  <div>
                    <h5>Filters</h5>
                  </div>
                  <div onClick={toggleSidebar} className="close-btn">
                    <img src={images.Cross} />
                  </div>
                </div>

                <div className="slider_content_box">
                  <div className="filter_bar">
                    <div className="Source">
                      <label className="form-label">
                        Search by Data Source Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter data source name"
                        value={tempFilterName}
                        onChange={(e) => setTempFilterName(e.target.value)}
                      />
                    </div>

                    <div className="Source">
                      <label className="form-label">Filter by Modality</label>
                      <select
                        className="form-select"
                        value={tempFilterModality}
                        onChange={(e) => setTempFilterModality(e.target.value)}
                      >
                        <option value="">Select Modality</option>
                        <option value="Text">Text</option>
                        <option value="Images">Images</option>
                        <option value="Video">Video</option>
                        <option value="Tabular">Tabular</option>
                        <option value="Audio">Audio</option>
                      </select>
                    </div>

                    <div className="Source">
                      <label className="form-label">
                        Filter by Terms (SPDX ID)
                      </label>
                      <select
                        className="form-select"
                        value={tempFilterTerms}
                        onChange={(e) => setTempFilterTerms(e.target.value)}
                      >
                        <option value="">Select Terms</option>
                        <option value="CC0-1.0">CC0-1.0</option>
                        <option value="CC0-1.1">CC0-1.1</option>
                        <option value="CC0-1.3">CC0-1.3</option>
                        <option value="CC0-1.4">CC0-1.4</option>
                      </select>
                    </div>

                    <div className=" Source_check_box">
                      <label className="form-label">
                        Filter by Data Availability
                      </label>
                      <div className="form-check-box">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="dataPublic"
                            checked={tempFilterProvider.includes('Public')}
                            onChange={() =>
                              handleDataAvailabilityChange('Public')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="dataPublic"
                          >
                            Public
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="dataGeated"
                            checked={tempFilterProvider.includes('Geated')}
                            onChange={() =>
                              handleDataAvailabilityChange('Geated')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="dataGeated"
                          >
                            Geated
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="Source_check_box">
                      <label className="form-label">
                        Filter by Personal Data
                      </label>
                      <div className="form_check_data">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="noPersonalData"
                            checked={tempFilterPersonalData.includes(
                              'No Personal Data'
                            )}
                            onChange={() =>
                              handlePersonalDataChange('No Personal Data')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="noPersonalData"
                          >
                            No Personal Data
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="anonymized"
                            checked={tempFilterPersonalData.includes(
                              'Anonymized'
                            )}
                            onChange={() =>
                              handlePersonalDataChange('Anonymized')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="anonymized"
                          >
                            Anonymized
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="pii"
                            checked={tempFilterPersonalData.includes(
                              'Personally identifiable'
                            )}
                            onChange={() =>
                              handlePersonalDataChange(
                                'Personally identifiable'
                              )
                            }
                          />
                          <label className="form-check-label" htmlFor="pii">
                            Personally identifiable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="botton_comb d-flex justify-content-end">
                    <div className="d-flex button_bar">
                      <div>
                        <button className=" Filters" onClick={cancelFilters}>
                          Cancel
                        </button>
                      </div>
                      <div>
                        <button
                          className=" Filters filter_apply_btn"
                          onClick={applyFilters}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="parent_div">
          <div className="d-flex justify-content-between align-items-center nav_height">
            <div className="main_content">
              <ul className="d-flex align-items-center unorder_list">
                <li className="main_content_list">
                  <a
                    href="#"
                    onClick={() => handleClick('data-source')}
                    className={
                      activeLink === 'data-source' ? 'active-link' : ''
                    }
                  >
                    Data Source
                  </a>
                </li>
                <li className="main_content_list Selected_link_text">
                  <a
                    onClick={() => handleClick('selected')}
                    className={activeLink === 'selected' ? 'active-link' : ''}
                    href="#"
                  >
                    Selected
                  </a>
                </li>
              </ul>
            </div>
            <button className="Filters" onClick={toggleSidebar}>
              Filters
            </button>
          </div>

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
