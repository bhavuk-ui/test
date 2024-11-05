import React from 'react';
import './App.css';
import RouteContext from './route';

function App() {
  return (
    <div className="d-flex main_container_box">
      <RouteContext />
    </div>
  );
}

export default App;
