import React from 'react';
import './Slidebar.css';
import { images } from './images/Imagesholder';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="d-flex flex-column   Slide_bar_width">
            <div className='logo_images'>
                <img src={images.Fastcatallogo} />
            </div>
            <ul className="nav flex-column">
                <li className="nav-item ">
                    <div className='nav-icon'>
                        <img src={images.Dashboard} />
                    </div>
                    <div>
                        <NavLink to="/"  className="nav-link active">My Project</NavLink>
                    </div>
                </li>
                <li className="nav-item ">
                    <div className='nav-icon'>
                        <img src={images.Property} />
                    </div>
                    <div>
                    <NavLink to="/Catalog"  className="nav-link">Catalog</NavLink>

                    </div>
                </li>
                <li className="nav-item ">
                    <div className='nav-icon'>
                        <img src={images.Document} />
                    </div>
                    <div>
                    <NavLink to="/Tools"  className="nav-link">Tools</NavLink>
                    </div>
                </li>
                <li className="nav-item ">
                    <div className='nav-icon'>
                        <img src={images.Setting} />
                    </div>
                    <div>
                    <NavLink to="/Settings"  className="nav-link">Settings</NavLink>

                    </div>
                </li>
                <li className="nav-item ">
                    <div className='nav-icon'>
                        <img src={images.Line} />
                    </div>
                    <div>
                                        <NavLink to="/Api"  className="nav-link">API</NavLink>
          </div>

                </li>
                <li className="nav-item">
                    <div className='nav-icon'>
                        <img src={images.Graph} />
                    </div>
                    <div>
                    <NavLink to="/Help"  className="nav-link">Help</NavLink>
                    </div>

                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
