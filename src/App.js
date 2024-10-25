
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/Sidebar';
import Catalog from './Component/Catalog';
import Tools from './Component/Tools';
import Settings from './Component/Settings';
import Api from './Component/Api';
import Help from './Component/Help';
import './App.css';
import MyProject from './Component/MyProject';

function App() {
  return (
    <Router>
      <div className="d-flex main_container_box">
        <Sidebar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/Myproject" element={ <MyProject />} />
            <Route path="/Tools" element={<Tools />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Api" element={<Api />} />
            <Route path="/Help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
