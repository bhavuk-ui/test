import React, { useState, useRef } from 'react';
import './MainContent.css';

const dataSources = [
    { id: 1, name: "20 Newsgroups", modality: "Text", provider: "Public", dataAvailability: "Jason Rennie", personalData: "Anonymized", terms: "CC0-1.1", homepage: "Link" },
    { id: 2, name: "2018 Data Science", modality: "Images", provider: "Geated", dataAvailability: "Jason Rennie", personalData: "No Personal Data", terms: "CC0-1.3", homepage: "Link" },
    { id: 3, name: "20 Newsgroups", modality: "Video", provider: "Public", dataAvailability: "Jason Rennie", personalData: "Personally identifiable", terms: "CC0-1.1", homepage: "Link" },
    { id: 4, name: "2010 i2b2/VA", modality: "Tabular", provider: "Geated", dataAvailability: "Jason Rennie", personalData: "Anonymized", terms: "CC0-1.4", homepage: "Link" },
    { id: 5, name: "2018 Data Science", modality: "Audio", provider: "Public", dataAvailability: "Jason Rennie", personalData: "No Personal Data", terms: "CC0-1.0", homepage: "Link" },
    { id: 6, name: "20 Newsgroups", modality: "Text", provider: "Geated", dataAvailability: "Jason Rennie", personalData: "Anonymized", terms: "CC0-1.1", homepage: "Link" },
    { id: 7, name: "2018 Data Science", modality: "Images", provider: "Public", dataAvailability: "Jason Rennie", personalData: "No Personal Data", terms: "CC0-1.3", homepage: "Link" },
    { id: 8, name: "20 Newsgroups", modality: "Video", provider: "Public", dataAvailability: "Jason Rennie", personalData: "Personally identifiable", terms: "CC0-1.1", homepage: "Link" },
];

const MainContent = () => {
    const [activeLink, setActiveLink] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
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

    const filteredData = dataSources.filter((data) => {
        return (
            data.name.toLowerCase().includes(tempFilterName.toLowerCase()) && 
            (!tempFilterModality || data.modality === tempFilterModality) &&    
            (!tempFilterTerms || data.terms === tempFilterTerms) &&             
            (tempFilterProvider.length === 0 || tempFilterProvider.includes(data.provider)) &&
            (tempFilterPersonalData.length === 0 || tempFilterPersonalData.includes(data.personalData))
        );
    });

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
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

    React.useEffect(() => {
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
        <div className="container-fluid body_color_right">
            <div className="sidebar-container">
                {isOpen && <div className="backdrop" onClick={toggleSidebar} />} 
                <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                    <aside className=" border-end">
                        <div>
                            <h5>Filters</h5>
                        </div>
                        <div className='slider_content_box'>
                            <div className='filter_bar'>
                                <div className="Source">
                                    <label className="form-label">Search by Data Source Name</label>
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
                                    <label className="form-label">Filter by Terms (SPDX ID)</label>
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
                                    <label className="form-label">Filter by Data Availability</label>
                                    <div className='form-check-box'>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="dataPublic"
                                                checked={tempFilterProvider.includes("Public")}
                                                onChange={() => handleDataAvailabilityChange("Public")}
                                            />
                                            <label className="form-check-label" htmlFor="dataPublic">Public</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="dataGeated"
                                                checked={tempFilterProvider.includes("Geated")}
                                                onChange={() => handleDataAvailabilityChange("Geated")}
                                            />
                                            <label className="form-check-label" htmlFor="dataGeated">Geated</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="Source_check_box">
                                    <label className="form-label">Filter by Personal Data</label>
                                    <div className='form_check_data'>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="noPersonalData"
                                                checked={tempFilterPersonalData.includes("No Personal Data")}
                                                onChange={() => handlePersonalDataChange("No Personal Data")}
                                            />
                                            <label className="form-check-label" htmlFor="noPersonalData">No Personal Data</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="anonymized"
                                                checked={tempFilterPersonalData.includes("Anonymized")}
                                                onChange={() => handlePersonalDataChange("Anonymized")}
                                            />
                                            <label className="form-check-label" htmlFor="anonymized">Anonymized</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="pii"
                                                checked={tempFilterPersonalData.includes("Personally identifiable")}
                                                onChange={() => handlePersonalDataChange("Personally identifiable")}
                                            />
                                            <label className="form-check-label" htmlFor="pii">Personally identifiable</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="botton_comb d-flex justify-content-end">
                                <div className='d-flex button_bar'>
                                    <div><button className=" Filters" onClick={cancelFilters}>Cancel</button></div>
                                    <div><button className=" Filters filter_apply_btn" onClick={applyFilters}>Apply</button></div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <div className='parent_div'>
                <div className="d-flex justify-content-between align-items-center  nav_height">
                    <div className='main_content'>
                        <ul className='d-flex align-items-center unorder_list'>
                            <li className='main_content_list'>
                                <a href='#'
                                    onClick={() => handleClick('data-source')}
                                    className={activeLink === 'data-source' ? 'active-link' : ''}
                                >Data Source</a></li>
                            <li className='main_content_list'><a onClick={() => handleClick('selected')}
                                className={activeLink === 'selected' ? 'active-link' : ''} href='#'>Selected</a></li>
                        </ul>
                    </div>
                    <button className=" Filters" onClick={toggleSidebar}>Filters</button>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <main className="col-12 p-0">
                            <table className="table table-bordered table-hover">
                                <thead className="table_color">
                                    <tr className='table_row'>
                                        <th className='head_check_box'>
                                            <input
                                                type="checkbox"
                                                onChange={() => setSelectedItems([])}
                                                checked={selectedItems.length === filteredData.length}
                                            />
                                        </th>
                                        <th className='full_name'>Full Name</th>
                                        <th className='modality'>Modality</th>
                                        <th className='Data_provider'>Data Provider</th>
                                        <th className='Data_availablity'>Data Availability</th>
                                        <th className='personal_data'>Personal Data</th>
                                        <th className='terms'>Terms</th>
                                        <th className='Homepage'>Homepage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((data) => (
                                        <tr key={data.id} className='table_data_row'>
                                            <td className='head_check_box'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(data.id)}
                                                    onChange={() => handleCheckboxChange(data.id)}
                                                />
                                            </td>
                                            <td>{data.name}</td>
                                            <td>{data.modality}</td>
                                            <td>{data.provider}</td>
                                            <td>{data.dataAvailability}</td>
                                            <td>{data.personalData}</td>
                                            <td>{data.terms}</td>
                                            <td className='homepage_Links'><a href="#">{data.homepage}</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between">
                                <span>Results per page: 50</span>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
