import React from 'react';

const CatalogTabs = ({ setIsOpen, setActiveLink, activeLink }) => {
  return (
    <div className="d-flex justify-content-between align-items-center nav_height">
      <div className="main_content">
        <ul className="d-flex align-items-center unorder_list">
          <li className="main_content_list">
            <a
              href="#"
              onClick={() => setActiveLink('data-source')}
              className={activeLink === 'data-source' ? 'active-link' : ''}
            >
              Data Source
            </a>
          </li>
          <li className="main_content_list Selected_link_text">
            <a
              onClick={() => setActiveLink('selected')}
              className={activeLink === 'selected' ? 'active-link' : ''}
              href="#"
            >
              Selected
            </a>
          </li>
        </ul>
      </div>
      <button className="Filters" onClick={() => setIsOpen(true)}>
        Filters
      </button>
    </div>
  );
};

export default CatalogTabs;
