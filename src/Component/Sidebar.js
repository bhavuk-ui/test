import React, { useState, useEffect } from 'react';
import './Slidebar.css';
import { images } from './images/Imagesholder';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import supabase from '../SupabaseAuth/supabaseClient';

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/Catalog');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path !== '/Catalog') {
      setActiveLink(path);
    }
  }, [location]);

  const handleClick = (linkName) => {
    setActiveLink(linkName);
    setIsOpen(false);
  };

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      navigate('/');
    }
  };

  return (
    <div>
      <div className="toggle-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>
      <div
        className={`d-flex flex-column Slide_bar_width ${isOpen ? 'open' : ''}`}
      >
        <div className="logo_images">
          <img src={images.Fastcatallogo} alt="Logo" />
          <div className="close-icon" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </div>
        </div>
        <ul className="nav flex-column">
          <NavLink
            to="/Myproject"
            className="nav-link"
            onClick={() => handleClick('/Myproject')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Myproject' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={
                    activeLink === '/Myproject'
                      ? images.Dashboardb
                      : images.Dashboard
                  }
                  alt="Dashboard"
                />
              </div>
              <div>My Project </div>
              <div>
                {activeLink === '/Myproject' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>

          <NavLink to="/" className="nav-link" onClick={() => handleClick('/')}>
            <li
              className={`nav-item ${activeLink === '/' ? 'active-links' : ''}`}
            >
              <div className="nav-icon">
                <img
                  src={activeLink === '/' ? images.Property : images.Propertyb}
                  alt="Catalog"
                />
              </div>
              <div>Catalog </div>
              <div>
                {activeLink === '/' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>
          <NavLink
            to="/Tools"
            className="nav-link"
            onClick={() => handleClick('/Tools')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Tools' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={
                    activeLink === '/Tools' ? images.Documentb : images.Document
                  }
                  alt="Tools"
                />
              </div>
              <div>Tools </div>
              <div>
                {activeLink === '/Tools' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>
          <NavLink
            to="/Settings"
            className="nav-link"
            onClick={() => handleClick('/Settings')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Settings' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={
                    activeLink === '/Settings'
                      ? images.Settingb
                      : images.Setting
                  }
                  alt="Settings"
                />
              </div>
              <div>Settings </div>
              <div>
                {activeLink === '/Settings' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>

          <NavLink
            to="/Api"
            className="nav-link"
            onClick={() => handleClick('/Api')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Api' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={activeLink === '/Api' ? images.Lineb : images.Line}
                  alt="API"
                />
              </div>
              <div>API</div>
              <div>
                {' '}
                {activeLink === '/Api' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>

          <NavLink
            to="/Help"
            className="nav-link"
            onClick={() => handleClick('/Help')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Help' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={activeLink === '/Help' ? images.Graphb : images.Graph}
                  alt="Help"
                />
              </div>
              <div>Help</div>
              <div>
                {activeLink === '/Help' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>
          <NavLink
            to="/Help"
            className="nav-link"
            onClick={() => handleClick('/Help')}
          >
            <li
              className={`nav-item ${
                activeLink === '/Help' ? 'active-links' : ''
              }`}
            >
              <div className="nav-icon">
                <img
                  src={activeLink === '/Help' ? images.Graphb : images.Graph}
                  alt="signput"
                />
              </div>
              <div>Help</div>
              <div>
                {activeLink === '/Help' && (
                  <img className="dots" src={images.Elipsdot} alt="dot" />
                )}
              </div>
            </li>
          </NavLink>
        </ul>
        <div className="signout-button">
          <button className="btn btn-danger" onClick={() => onSignOut()}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
