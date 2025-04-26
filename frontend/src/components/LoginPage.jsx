import { useFormik } from 'formik';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { userLogIn } from '../slices/authSlice.js';
import SimpleHeader from './SimpleHeader.jsx';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setError(null);
      try {
        const response = await axios.post('/api/v1/login', values);
        const { token, username } = response.data;
        dispatch(userLogIn({ username, token }));
        navigate('/');
      } catch(error) {
        if (error.code === 'ERR_NETWORK') {
          setError('Ошибка сети');
        } else {
          setError('Неверные имя пользователя или пароль');
        }
      }
    }
  });

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  return (
    <>
      <SimpleHeader />
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>{t('username')}</Form.Label>
            <Form.Control
              ref={usernameInputRef}
              id="username"
              type="text"
              name="username"
              placeholder={t('username')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder={t('password')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </Form.Group>
          {error && (<Alert variant="danger" className="mb-3">{error}</Alert>)}
          <Button className="w-100" variant="primary" type="submit">{t('loginPage.login')}</Button>
          <Form.Text className="text-center mt-3 d-block">
            {t('loginPage.noAcc')} <Link to="/signup">{t('loginPage.signupNavigate')}</Link>
          </Form.Text>
        </Form>
      </Container>
    </>
  );
}

export default LoginPage;

