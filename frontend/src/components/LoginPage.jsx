import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { actions as  authActions } from '../slices/authSlice.js';

const validationSchema = yup.object({
  username: yup.string()
    .required('Не должно быть пустым')
    .min(3, 'Имя пользователя должно быть не менее 3 символов'),
  password: yup.string()
    .required('Не должно быть пустым')
    .min(3, 'Пароль должен быть не менее 3 символов'),
});

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
    validationSchema,
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
            isInvalid={formik.touched.username && !!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
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
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
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