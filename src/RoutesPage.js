import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import MainContent from './Component/MainContent';
import Catalog from './Component/Catalog';
import Tools from './Component/Tools';
import Settings from './Component/Settings';
import Api from './Component/Api';
import Help from './Component/Help';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/Catalog">Catalog</NavLink></li>
        <li><NavLink to="/Tools">Tools</NavLink></li>
        <li><NavLink to="/Settings">Settings</NavLink></li>
        <li><NavLink to="/Api">API</NavLink></li>
        <li><NavLink to="/Help">Help</NavLink></li>
      </ul>
    </nav>
  );
};

const RoutesPage = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Tools" element={<Tools />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Api" element={<Api />} />
        <Route path="/Help" element={<Help />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage;
