import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MessageForm from './MessageForm.jsx';
import { getMessages } from '../slices/messagesSlice.js';

const ChatWindow = ({ localToken, activeChannel }) => {
  const dispatch = useDispatch();
  
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

      <MessageForm localToken={localToken} activeChannel={activeChannel} />
    </>
  );
};

export default ChatWindow;