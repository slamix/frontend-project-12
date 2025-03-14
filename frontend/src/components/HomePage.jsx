import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
{ /*import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions as authActions } from '../slices/authSlice.js'; */}

const HomePage = () => {
  {/* const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch(); */}
  const localToken = localStorage.getItem('token');
  const navigate = useNavigate();
  {/* TODO work with localStorage because we don't have log out button on homepage and this is reason why we cant redirect form homepage to auth page ;-( */}
  useEffect(() => {
    if (!localToken) {
      navigate('/login');
    }
  }, [localToken, navigate]);

  return <h1>Home</h1>
};

export default HomePage;