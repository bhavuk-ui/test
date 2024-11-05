/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { images } from '../images/Imagesholder';
import { FILTER_INITIAL_VALUE } from '../../constants/constants';

const CatalogFilter = (props) => {
  const { setCatlogFilterValue, isOpen, setIsOpen } = props;
  const sidebarRef = useRef(null);

  const [filterValue, setFilterValue] = useState(FILTER_INITIAL_VALUE);

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

  const updateFilter = (filterType, value) => {
    setFilterValue((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // Function for handling checkboxes with array values
  const toggleArrayValue = (filterType, value) => {
    setFilterValue((prevFilters) => {
      const currentArray = prevFilters[filterType];
      return {
        ...prevFilters,
        [filterType]: currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  const onCancelFilter = () => {
    setFilterValue(FILTER_INITIAL_VALUE);
    setIsOpen(false);
    setCatlogFilterValue(FILTER_INITIAL_VALUE);
  };

  const onApplyFilter = () => {
    setIsOpen(false);
    setCatlogFilterValue(filterValue);
  };

  return (
    <div className="sidebar-container">
      {isOpen && <div className="backdrop" onClick={toggleSidebar} />}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
        <aside className=" border-end">
          <div className="filter_section">
            <div className="d-flex justify-content-between cross_icon">
              <div>
                <h5>Filters</h5>
              </div>
              <div onClick={toggleSidebar} className="close-btn">
                <img src={images.Cross} alt="cross" />
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
                    value={filterValue.name}
                    onChange={(e) => updateFilter('name', e.target.value)}
                  />
                </div>

                <div className="Source">
                  <label className="form-label">Filter by Modality</label>
                  <select
                    className="form-select"
                    value={filterValue.modality}
                    onChange={(e) => updateFilter('modality', e.target.value)}
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
                    value={filterValue.spdx_id}
                    onChange={(e) => updateFilter('spdx_id', e.target.value)}
                  >
                    <option value="">Select Terms</option>
                    <option value="CC0-1.0">CC0-1.0</option>
                    <option value="CC0-1.1">CC0-1.1</option>
                    <option value="CC0-1.3">CC0-1.3</option>
                    <option value="CC0-1.4">CC0-1.4</option>
                  </select>
                </div>

                <div className="Source_check_box">
                  <label className="form-label">
                    Filter by Data Availability
                  </label>
                  <div className="form-check-box">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="dataPublic"
                        checked={filterValue.data_availability === 'public'}
                        onChange={() =>
                          updateFilter(
                            'data_availability',
                            filterValue.data_availability === 'public'
                              ? ''
                              : 'public'
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor="dataPublic">
                        Public
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="dataGeated"
                        checked={filterValue.data_availability === 'gated'}
                        onChange={() =>
                          updateFilter(
                            'data_availability',
                            filterValue.data_availability === 'gated'
                              ? ''
                              : 'gated'
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor="dataGeated">
                        Gated
                      </label>
                    </div>
                  </div>
                </div>

                <div className="Source_check_box">
                  <label className="form-label">Filter by Personal Data</label>
                  <div className="form_check_data">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="personal_data_type"
                        checked={filterValue.personal_data_type.includes(
                          'no personal data'
                        )}
                        onChange={() =>
                          toggleArrayValue(
                            'personal_data_type',
                            'no personal data'
                          )
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="personal_data_type"
                      >
                        No Personal Data
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="anonymized"
                        checked={filterValue.personal_data_type.includes(
                          'anonymized'
                        )}
                        onChange={() =>
                          toggleArrayValue('personal_data_type', 'anonymized')
                        }
                      />
                      <label className="form-check-label" htmlFor="anonymized">
                        Anonymized
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="pii"
                        checked={filterValue.personal_data_type.includes(
                          'personally identifiable information'
                        )}
                        onChange={() =>
                          toggleArrayValue(
                            'personal_data_type',
                            'personally identifiable information'
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
                    <button
                      className="Filters"
                      onClick={() => onCancelFilter()}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      className="Filters filter_apply_btn"
                      onClick={() => onApplyFilter()}
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
  );
};

export default CatalogFilter;
