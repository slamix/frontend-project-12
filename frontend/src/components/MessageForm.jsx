import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNewMessage } from '../slices/messagesSlice.js';

const MessageForm = ({ localToken, activeChannel }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const channelId = activeChannel.id;
      const { message } = values;
      const username = localStorage.getItem('username');
      dispatch(addNewMessage({ token: localToken, body: message, channelId, username }));
      formik.resetForm();
    }
  });

  const textareaRef = useRef(null);
  useEffect(() => {
    textareaRef.current.focus();
  }, [activeChannel]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      formik.handleSubmit();
    }
  }

  return (
    <Form className="p-3 border-top" onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Сообщение"
          style={{ resize: 'none' }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
        <Button variant="primary" className="ms-2" type="submit">
          Отправить
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
