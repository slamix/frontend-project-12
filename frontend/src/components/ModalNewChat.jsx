import { Form, Button, Modal } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const ModalNewChat = ({ setShowModal, showModal, channels }) => {
  const [disabled, setDisabled] = useState(false);

  const validationSchema = yup.object({
    newChannelName: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('no-spaces', 'Обязательное поле', (value) => {
        return value.trim().length > 0;
      })
      .test('unique-channel', 'Должно быть уникальным', (value) => {
        return !channels.some((channel) => channel.name === value.trim());
      }),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    context: { channels },
    onSubmit: async (values) => {
      setDisabled(true);
      const token = localStorage.getItem('token');
      const { newChannelName } = values;
      try {
        await axios.post('/api/v1/channels', { name: newChannelName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } catch(err) {
        console.log(err);
      } finally {
        formik.resetForm();
        setDisabled(false);
      }
      
      formik.resetForm();
      if (!formik.errors.newChannelName) {
        handleClose();
      }
    }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);
  
  const handleClose = () => {
    formik.setErrors({});
    formik.resetForm();
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannelName">
            <Form.Control
              ref={inputRef}
              id="newChannelName"
              type="text"
              name="newChannelName"
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              isInvalid={!!formik.errors.newChannelName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              Отправить
            </Button> 
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalNewChat;