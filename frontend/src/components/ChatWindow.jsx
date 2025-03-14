import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { getMessages } from '../slices/messagesSlice.js';
import { addNewMessage } from '../slices/messagesSlice.js';

const ChatWindow = ({ localToken, activeChannel }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const { message } = values;
      const username = localStorage.getItem('username');
      dispatch(addNewMessage({ token: localToken, body: message, channelId: activeChannel.id, username }));
      formik.resetForm();
    }
  });
  
  const messages = useSelector((state) => state.messages.messages);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannel?.id);

  useEffect(() => {
    dispatch(getMessages(localToken));
  }, [dispatch, localToken]);

  return (
    <>
      <div className="bg-light border-bottom p-3">
        <h5 className="mb-0">{activeChannel?.name}</h5>
      </div>
      <Card className="flex-grow-1 rounded-0 border-0">
        <Card.Body className="d-flex flex-column overflow-auto">
          {filteredMessages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>{message.username}:</strong> {message.body}
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* <MessageForm localToken={localToken} channelId={activeChannel} /> */}
      <Form className="p-3 border-top" onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Сообщение..."
          style={{ resize: 'none' }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <Button variant="primary" className="ms-2" type="submit">
          Отправить
        </Button>
      </Form.Group>
    </Form>
    </>
  );
};

export default ChatWindow;