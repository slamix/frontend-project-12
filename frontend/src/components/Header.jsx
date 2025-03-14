import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions as authActions } from '../slices/authSlice.js';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(authActions.userLogOut());
    navigate('/');
  }

  return (
    <div className="bg-light border-bottom p-2">
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Header);