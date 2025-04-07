import { ListGroup, Button, Container, Dropdown, DropdownButton ,SplitButton } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import ModalNewChat from './ModalNewChat.jsx';
import RemovableChannel from './channels/RemovableChannel.jsx';
import UnremovableChannel from './channels/UnremovableChannel.jsx';

const ChannelList = ({ channels, activeChannel, onChannelClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const activeChannelRef = useRef(null);

  useEffect(() => {
    if (activeChannelRef.current) {
      activeChannelRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [activeChannel]);
  
  return (
    <>
      {activeChannel && channels.length && (
      <Container fluid className="p-0 d-flex flex-column" style={{ height: '91vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Каналы</h4>
          <Button variant="outline-primary" size="sm" onClick={handleShow}>
            +
          </Button>
        </div>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: '0' }}>
          <ListGroup>
            {channels.map((channel) => (
              <ListGroup.Item
                ref={activeChannel.id === channel.id ? activeChannelRef : null}
                key={channel.id}
                active={channel.id === activeChannel.id}
                className="p-0 border-0"
              >
                {channel.removable ? (
                  <RemovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel.id}
                    onClick={() => onChannelClick(channel)}
                  />
                ) : (
                  <UnremovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel.id}
                    onClick={() => onChannelClick(channel)}
                  />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <ModalNewChat showModal={showModal} setShowModal={setShowModal} channels={channels} />
      </Container>
      )}
    </>
  );
};

export default ChannelList;
