import { ListGroup, Button } from 'react-bootstrap';

const ChannelList = ({ channels, activeChannel, onChannelClick }) => {
  return (
    <>
      {activeChannel && channels.length && (
        <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Каналы</h4>
          <Button variant="outline-primary" size="sm">
            +
          </Button>
        </div>
        <ListGroup style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {channels.map((channel) => (
            <ListGroup.Item
              key={channel.id}
              onClick={() => onChannelClick(channel)}
              active={channel.id === activeChannel.id}
              action
            >
              {`# ${channel.name}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
      )}
    </>
  )
};

export default ChannelList;

