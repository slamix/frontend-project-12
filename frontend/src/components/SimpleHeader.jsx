import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-light border-bottom p-2">
      <div className="d-flex justify-content-between align-items-center">
        <span 
          className="fs-4 cursor-pointer" 
          onClick={goToHome}
          style={{ cursor: 'pointer' }}
        >
          Hexlet Chat
        </span>
      </div>
    </div>
  );
};

export default React.memo(Header);