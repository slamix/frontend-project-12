import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { actions as authActions } from '../slices/authSlice.js';

const registrationSchema = yup.object({
  username: yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .test('no-spaces', 'Обязательное поле', (value) => {
      return value.trim().length > 0;
    }),
  password: yup.string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов')
    .test('no-spaces', 'Обязательное поле', (value) => {
      return value.trim().length > 0;
    }),
  confirmPassword: yup.string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignupPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setError(null);
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        const { username, token } = response.data;
        dispatch(authActions.userLogIn({ username, token }));
        navigate('/');
      } catch (error) {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          setError('Ошибка сети');
        } else if (error.code === 'ERR_BAD_REQUEST') {
          setError('Такой пользователь уже существует');
        } else {
          setError('Неизвестная ошибка');
        }
      }
    }
  });

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            ref={usernameInputRef}
            id="username"
            type="text"
            name="username"
            placeholder="Имя пользователя"
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={!!formik.errors.username}
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

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        {error && (<Alert variant="danger" className="mb-3">{error}</Alert>)}

        <Button className="w-100" variant="primary" type="submit">Зарегистрироваться</Button>

        <Form.Text className="text-center mt-3 d-block">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}

export default SignupPage;