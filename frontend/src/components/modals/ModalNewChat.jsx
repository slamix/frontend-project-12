import { Form, Button, Modal } from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

const ModalNewChat = ({ setShowModal, showModal, channels, setIsChannelCreator }) => {
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();

  const notify = () => toast.success(t('notifications.created'));

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
        setIsChannelCreator(true);
        await axios.post('/api/v1/channels', { name: newChannelName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        notify();
      } catch(err) {
        console.log(err);
        setIsChannelCreator(false);
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
        <Modal.Title id="contained-modal-title-vcenter">{t('modals.newChatModal.addChannel')}</Modal.Title>
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
            {t('modals.newChatModal.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
            {t('modals.newChatModal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalNewChat;