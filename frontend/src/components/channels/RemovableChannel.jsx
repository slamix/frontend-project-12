import { Button, Dropdown, } from "react-bootstrap";

const RemovableChannel = ({ channel, isActive, onClick }) => (
  <div className="d-flex">
    <Button
      variant={isActive ? 'primary' : 'light'}
      onClick={onClick}
      className={`text-start flex-grow-1 rounded-0 border-end-0 ${isActive ? 'text-white' : ''}`}
      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
    >
      # {channel.name}
    </Button>
    <Dropdown
        align="end"
        drop="down"
        className="rounded-0"
      >
        <Dropdown.Toggle
          variant={isActive ? 'primary' : 'light'}
          className={`rounded-0 border-start-0 ${isActive ? 'text-white' : ''}`}
        />
        
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
          <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  </div>
);

export default RemovableChannel;