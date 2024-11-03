import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '3rem',
          height: '3rem',
          borderWidth: '0.3em',
          borderColor: '#141263 transparent transparent transparent',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
