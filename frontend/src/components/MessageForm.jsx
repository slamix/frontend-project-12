import { useFormik } from 'formik';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';


const MessageForm = ({ localToken, activeChannel }) => {
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      setError(null);
      const trimmedMessage = values.message.trim();
      if (!trimmedMessage) {
        return;
      }
      const channelId = activeChannel.id;
      const username = localStorage.getItem('username');
      try {
        await axios.post('/api/v1/messages', { body: trimmedMessage, channelId, username }, {
          headers: {
            Authorization: `Bearer ${localToken}`,
          }
        });
      } catch(err) {
        if (err.code === 'ERR_NETWORK') {
          setError('Ошибка сети');
          console.log(error);
        } else {
          setError('Неизвестая ошибка');
          console.log(error);
        }
      } 
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
