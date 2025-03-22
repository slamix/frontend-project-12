import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import MessageForm from './MessageForm.jsx';
import { getMessages } from '../slices/messagesSlice.js';

const ChatWindow = ({ localToken, activeChannel }) => {
  const dispatch = useDispatch();
  
  const messages = useSelector((state) => state.messages.messages);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannel?.id);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
  }, [filteredMessages]);

  useEffect(() => {
    dispatch(getMessages(localToken));
  }, [dispatch, localToken]);

  return (
    <>
      {activeChannel && (
        <div className="bg-light border-bottom p-3">
          <h5 className="mb-0">{`# ${activeChannel?.name}`}</h5>
        </div>
      )}
      <Card className="flex-grow-1 rounded-0 border-0 d-flex flex-column">
          <Card.Body className="overflow-auto" style={{ maxHeight: '79vh' }}>
            {filteredMessages.map((message) => (
              <div key={message.id} className="mb-2" style={{ wordWrap: 'break-word'}}>
                <strong>{message.username}:</strong> {message.body}
              </div>
            ))}
            <div ref={messagesEndRef} /> 
          </Card.Body>
        </Card>
    </>
  );
};

export default ChatWindow;
