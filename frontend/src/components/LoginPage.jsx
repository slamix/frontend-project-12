import { useFormik } from 'formik';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { actions as  authActions } from '../slices/authSlice.js';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);

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
        dispatch(authActions.userLogIn({ username, token }));
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
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            ref={usernameInputRef}
            id="username"
            type="text"
            name="username"
            placeholder="Ваше имя пользователя"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </Form.Group>
        {error && (<Alert variant="danger" className="mb-3">{error}</Alert>)}
        <Button className="w-100" variant="primary" type="submit">Войти</Button>
        <Form.Text className="text-center mt-3 d-block">
          Нет аккаунта? <Link to="/signup">Регистрация</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}

export default LoginPage;